# API Reference

> REST API documentation for TechFiesta Fraud Guard

## Base URL

```
http://localhost:8000
```

---

## Endpoints

### `POST /predict`

Analyze a transaction for fraud.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "transaction": {
    "transaction_id": "TXN_123456789",
    "amount": 1500.00,
    "merchant_category": "electronics",
    "user_id": "USR_001",
    "timestamp": "2026-01-05T14:30:00",
    "country": "US",
    "merchant_country": "US",
    "payment_method": "credit_card",
    "device_id": "DEV_ABC123",
    "lat": 40.7128,
    "lon": -74.0060
  }
}
```

#### Response

**Success (200 OK):**
```json
{
  "decision": "FRAUD",
  "final_score": 0.7823,
  "risk_level": "CRITICAL",
  "triggered_rules": [
    "high_amount",
    "velocity_suspicious"
  ],
  "model_scores": {
    "xgboost": 0.8123,
    "lightgbm": 0.7654,
    "catboost": 0.7891
  }
}
```

**Error (422 Unprocessable Entity):**
```json
{
  "detail": "Missing 'transaction' key in JSON"
}
```

**Error (500 Internal Server Error):**
```json
{
  "detail": "Internal Server Error: [error message]"
}
```

---

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `decision` | string | Final fraud verdict |
| `final_score` | float | Combined fraud probability (0.0-1.0) |
| `risk_level` | string | Risk classification |
| `triggered_rules` | array | List of rule names that fired |
| `model_scores` | object | Individual ML model probabilities |

### Decision Values

| Value | Meaning |
|-------|---------|
| `LEGITIMATE` | Transaction is safe |
| `FRAUD` | Transaction flagged as fraud |
| `FRAUD (HARD BLOCK)` | Instant block by rules (score ≥ 85%) |

### Risk Levels

| Level | Score Range | Action |
|-------|-------------|--------|
| `LOW` | 0.0 - 0.5 | Allow transaction |
| `HIGH` | 0.5 - 0.7 | Review recommended |
| `CRITICAL` | 0.7 - 1.0 | Block transaction |

---

## Transaction Input Fields

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `transaction_id` | string | Unique transaction ID | `"TXN_123"` |
| `amount` | float | Transaction amount | `150.00` |
| `user_id` | string | User identifier | `"USR_001"` |

### Recommended Fields

These fields significantly improve detection accuracy:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `timestamp` | string | ISO 8601 datetime | `"2026-01-05T14:30:00"` |
| `merchant_category` | string | Merchant type | `"electronics"` |
| `country` | string | Transaction country | `"US"` |
| `device_id` | string | Device identifier | `"DEV_ABC"` |
| `payment_method` | string | Payment type | `"credit_card"` |

### Optional Fields

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `lat` | float | Latitude | `null` |
| `lon` | float | Longitude | `null` |
| `merchant_country` | string | Merchant location | Same as `country` |
| `is_new_device` | int | 0 or 1 | Computed from `device_id` |
| `txns_last_10min` | int | Recent transaction count | Computed |

---

## Example: cURL

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "transaction": {
      "transaction_id": "TXN_TEST_001",
      "amount": 2500.00,
      "user_id": "USR_12345",
      "merchant_category": "electronics",
      "timestamp": "2026-01-05T03:30:00",
      "country": "US",
      "device_id": "NEW_DEVICE_XYZ"
    }
  }'
```

---

## Example: Python

```python
import requests

response = requests.post(
    "http://localhost:8000/predict",
    json={
        "transaction": {
            "transaction_id": "TXN_TEST_002",
            "amount": 50.00,
            "user_id": "USR_12345",
            "merchant_category": "grocery",
            "timestamp": "2026-01-05T12:00:00",
            "country": "US"
        }
    }
)

result = response.json()
print(f"Decision: {result['decision']}")
print(f"Score: {result['final_score']:.2%}")
```

---

## Example: JavaScript (Fetch)

```javascript
const response = await fetch('http://localhost:8000/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    transaction: {
      transaction_id: 'TXN_TEST_003',
      amount: 150.00,
      user_id: 'USR_12345',
      merchant_category: 'retail',
      timestamp: new Date().toISOString(),
      country: 'US'
    }
  })
});

const result = await response.json();
console.log(`Decision: ${result.decision}`);
```

---

## Rate Limits

| Environment | Limit |
|-------------|-------|
| Development | No limit |
| Production | Recommended: 1000 req/min |

---

## CORS Configuration

The API allows all origins by default:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

For production, restrict `allow_origins` to your frontend domain.
