# Rules Engine Documentation

> 30 expert fraud detection rules organized in 9 tiers

## Overview

The Rule-Based Engine provides fast (~10ms), explainable fraud detection using expert-crafted rules. Each rule has a **weight** (10-98) indicating fraud severity.

**Key Thresholds:**
- **Hard Block**: Score ≥ 85% → Instant FRAUD (bypasses ML)
- **High Risk**: Score ≥ 60% → 35% rule influence in final blend
- **Low Risk**: Score < 60% → 10% rule influence in final blend

---

## Rule Tiers

### Tier 1: Critical Rules (Immediate Fraud)

| Rule | Weight | Condition |
|------|--------|-----------|
| `speed_of_light_violation` | **98** | Travel speed > 1,500 km/h (teleportation) |
| `refund_before_purchase` | **98** | Refund transaction with 0 prior purchases |
| `sanctioned_country_merchant` | **90** | US/UK user + merchant in sanctioned country |
| `card_testing_sequence` | **85** | 2+ micro txns (<$15) followed by large (>$300) in 5min |
| `repeat_fraud_offender` | **85** | User has 2+ past fraud incidents |
| `micro_txn_velocity` | **85** | 3+ micro transactions in 5 minutes |

---

### Tier 2: High-Risk Combinations

| Rule | Weight | Condition |
|------|--------|-----------|
| `device_fingerprint_chaos` | **80** | 5+ devices AND 5+ IPs in 24 hours |
| `impossible_user_profile` | **75** | Account < 7 days + failed KYC + amount > $500 |
| `merchant_category_hopping` | **70** | 3+ high-risk categories in 1 hour |
| `fraud_history_high` | **65** | 2+ past frauds + current amount > $200 |
| `payment_method_mismatch` | **65** | Crypto merchant + card payment |
| `timezone_impossibility` | **60** | 2-5 AM local time + different country |

---

### Tier 3: Velocity & Behavioral Rules

| Rule | Weight | Condition |
|------|--------|-----------|
| `velocity_attack_extreme` | **50** | > 10 transactions in 10 minutes |
| `suspicious_travel` | **50** | Travel speed 500-900 km/h (fast but possible) |
| `new_device_night_high` | **45** | New device + night (0-5 AM) + amount > $500 |
| `new_country_high_amount` | **40** | New country + amount > $1,000 |
| `impossible_travel` | **40** | Travel speed > 900 km/h |
| `email_country_mismatch` | **40** | Email domain country ≠ billing country |

---

### Tier 4: Amount Anomalies

| Rule | Weight | Condition |
|------|--------|-----------|
| `amount_anomaly_extreme` | **35** | Amount > 10x user average |
| `country_mismatch` | **35** | 2+ country mismatches + high-risk country |
| `velocity_attack` | **30** | 5-10 transactions in 10 minutes |
| `first_txn_high` | **30** | First transaction ever > $1,000 |

---

### Tier 5: Single Indicators

| Rule | Weight | Condition |
|------|--------|-----------|
| `high_amount` | **25** | Amount > 5x user average |
| `rapid_burst` | **25** | > 3 transactions in 1 minute |
| `new_country` | **20** | Transaction from new country |
| `high_risk_merchant_night` | **20** | High-risk merchant + night hours |
| `new_device` | **15** | Transaction from unknown device |
| `velocity_suspicious` | **15** | 3-4 transactions in 10 minutes |
| `night_transaction` | **10** | Transaction during 0-5 AM |

---

## Rule Evaluation Logic

```python
# Each transaction is evaluated against all rules
# Score = MAX of all triggered rule weights (not cumulative)

def evaluate(transaction):
    triggered_rules = []
    max_score = 0
    
    for rule_name, rule_fn, weight in rules:
        if rule_fn(transaction):
            triggered_rules.append((rule_name, weight))
            max_score = max(max_score, weight)
    
    return max_score, triggered_rules
```

**Why MAX instead of SUM?**
- A single critical rule (e.g., `speed_of_light_violation`) should immediately flag fraud
- Prevents score inflation from multiple minor rules
- More interpretable: "blocked because of impossible travel" vs "blocked because 5 small things"

---

## Contextual Weight Adjustment

Some rules support dynamic weight adjustment based on context:

```python
# Night transaction weight adjusts based on user segment
if user_segment == 'corporate':
    weight *= 0.3  # Corporate users work late
elif merchant_category in ['food', 'entertainment']:
    weight *= 0.5  # Expected at night
elif merchant_category in ['crypto', 'money_transfer']:
    weight *= 2.0  # High risk at night
```

---

## Hard Block vs Soft Block

| Action | Threshold | Behavior |
|--------|-----------|----------|
| **Hard Block** | ≥ 85% | Instant FRAUD, no ML evaluation |
| **High Risk** | 60-84% | ML evaluated, 35% rule blend |
| **Low Risk** | < 60% | ML evaluated, 10% rule blend |

---

## Rule Performance (Test Set)

| Metric | Value |
|--------|-------|
| Hard Blocked | 1,289 transactions (5.73%) |
| Hard Block Precision | ~95% (mostly true fraud) |
| Rules Contribution | 35% in high-risk, 10% in low-risk final score |

---

## Adding New Rules

To add a new rule:

1. **Define in `RULE_WEIGHTS`:**
```python
RULE_WEIGHTS = {
    ...
    "my_new_rule": 45,  # Weight based on fraud severity
}
```

2. **Define condition in `RULE_CONDITIONS`:**
```python
RULE_CONDITIONS = {
    ...
    "my_new_rule": {
        "op": "and",
        "conditions": [
            {"field": "amount", "op": ">", "value": 1000},
            {"field": "is_new_device", "op": "==", "value": 1}
        ]
    }
}
```

3. **Add to `RuleBasedEngine._setup_rules()`:**
```python
('my_new_rule', lambda x: (
    x.get('amount', 0) > 1000 and 
    x.get('is_new_device', 0) == 1
), self.weights['my_new_rule']),
```

---

## Rule Categories Summary

| Category | Rules | Weight Range |
|----------|-------|--------------|
| Physical Impossibility | 3 | 40-98 |
| Sequential Patterns | 3 | 70-85 |
| Business Logic | 3 | 65-98 |
| Identity Coherence | 3 | 40-80 |
| Velocity/Behavioral | 5 | 15-50 |
| Amount Anomalies | 3 | 25-35 |
| Device/Location | 4 | 15-45 |
| Timing | 2 | 10-20 |
| Repeat Offenders | 2 | 65-85 |
