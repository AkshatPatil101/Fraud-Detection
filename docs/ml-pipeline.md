# ML Pipeline Architecture

> Complete 8-step cascaded fraud detection training pipeline

## Pipeline Overview

![Training Pipeline Mindmap](Detailed_Training_Mindmap.png)

---

## Step-by-Step Breakdown

### Step 1: Data Preparation & Feature Engineering

| Component | Details |
|-----------|---------|
| **Input** | 150,000 transactions, 38 raw features |
| **Time-Aware Split** | 70:15:15 (Train:Val:Test) preserving temporal order |
| **Feature Engineering** | 220 → 235 engineered features |
| **Scaling** | Hybrid (RobustScaler + QuantileTransformer) |

**Feature Categories:**
- ⏰ **Temporal** - Hour, day of week, weekend flag, time since last transaction
- 💵 **Amount** - Raw amount, log amount, amount vs user average, percentile
- 👤 **User Behavioral** - Transaction count, velocity, historical patterns
- 🌍 **Location** - Country, distance from home, travel speed
- 🏪 **Merchant** - Category, risk level, user-merchant history
- 📱 **Device/Channel** - Device type, is new device, channel type
- 🕸️ **Graph Network** - User-merchant relationship features
- ⚠️ **Risk Flags** - Composite risk scores, anomaly indicators

---

### Step 2: Class Distribution Verification

| Metric | Value |
|--------|-------|
| Training Set | 105,000 samples (24.04% fraud) |
| Validation Set | 22,500 samples (22.80% fraud) |
| Test Set | 22,500 samples (22.80% fraud) |
| Balancing Method | Model weights (no resampling) |

> ✅ Using existing distribution balanced via model `scale_pos_weight` parameters

---

### Step 3: Framework Components (Rule Engine + BNN)

#### Rule-Based Engine
- **10 expert rule categories** with 30 individual rules
- **Tiered weights**: 10-98 points based on fraud severity
- **Hard Block threshold**: ≥85% → Instant FRAUD decision
- See [Rules Engine Documentation](rules-engine.md) for full rule list

#### Bayesian Neural Network (BNN)
| Parameter | Value |
|-----------|-------|
| Training Zone | Gray zone (rule scores 30-84%) |
| Training Samples | ~18,000 samples |
| Architecture | MLPClassifier (16 → 8 hidden units) |
| Threshold | 0.491 (self-calibrated) |
| High-Risk Rate | 47.7% |

**Purpose**: Identify which gray-zone transactions need extra rule influence (35% blend vs 10% blend)

---

### Step 4: ML Models Training

All models use **pre-tuned hyperparameters** from Bayesian Optimization (600+ trials).

| Model | Estimators | Learning Rate | Special Features |
|-------|------------|---------------|------------------|
| **XGBoost** | 1,600 | 0.0126 | GPU acceleration, early stopping |
| **LightGBM** | 676 (early stop) | 0.0145 | Best validation AUC: 0.891 |
| **CatBoost** | 1,481 | 0.0687 | GPU training, symmetric trees |

---

### Step 5: Ensemble Weight Assignment

Weights optimized via **Bayesian Optimization** (Trial 256, Score=0.7325):

```
┌─────────────────────────────────────────────────────────┐
│  LightGBM    ████████████████████████████████░░░  68.47% │
│  XGBoost     ████████████░░░░░░░░░░░░░░░░░░░░░░░  24.16% │
│  CatBoost    ███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   7.37% │
└─────────────────────────────────────────────────────────┘
```

---

### Step 6: Strategy Comparison

8 ensemble voting strategies evaluated on validation set:

| Strategy | F2% | Precision% | Recall% | AUC% |
|----------|-----|------------|---------|------|
| **average** ⭐ | 73.20 | 60.17✓ | 77.39 | 89.16 |
| weighted | 73.16 | 60.16✓ | 77.33 | 89.18 |
| bayesian_opt | 72.90 | 60.14✓ | 76.98 | 89.18 |
| tiered_vote | 72.78 | 61.13✓ | 76.42 | 89.17 |
| conf_weighted | 72.92 | 60.17✓ | 77.00 | 89.18 |
| delphi | 73.20 | 60.17✓ | 77.39 | 89.16 |
| stack_enhanced | 73.08 | 60.50✓ | 77.08 | 89.06 |
| bouncer | 72.64 | 60.65✓ | 76.42 | 88.93 |

> **Selected Strategy**: `average` (simple average of model probabilities)

> **Note**: `bayesian_opt` is selected as final strategy since it offered better performance on diverse set of custom test cases

---

### Step 7: Cascade Threshold Analysis

61 thresholds tested from 0.10 to 0.60 with constraint: **Best F2 with Precision 50-55%**

| Threshold | Recall% | Precision% | F1% | F2% | Notes |
|-----------|---------|------------|-----|-----|-------|
| 0.340 | 83.82 | 50.59 | 63.10 | 74.09 | Max Recall @P≥50% |
| **0.360** ⭐ | 83.01 | 52.03 | 63.97 | **74.18** | **OPTIMAL** |
| 0.520 | 71.41 | 67.18 | 69.23 | 70.52 | Best F1 |

> **Selected Threshold**: `0.360` (maximizes F2-Score within precision target)

---

### Step 8: Final Cascaded Evaluation

#### Evaluation Flow
```
22,500 Test Transactions
         │
         ▼
┌─────────────────────────────┐
│  Rule Engine (score ≥ 89%)  │ ──→ HARD BLOCK: 1,289 (5.73%)
└─────────────────────────────┘
         │ score < 89%
         ▼
┌─────────────────────────────┐
│  BNN High-Risk Check        │ ──→ High Risk: 1,856 → T6 Blend (85%ML + 35%Rule)
└─────────────────────────────┘
         │ Low Risk
         ▼
┌─────────────────────────────┐
│  Low Risk Blend             │ ──→ 19,355 → T6 Blend (90%ML + 10%Rule)
└─────────────────────────────┘
         │
         ▼
    Apply Threshold 0.360
         │
         ▼
    FINAL DECISION
```

#### Final Metrics (Test Set)

| Metric | Value | Status |
|--------|-------|--------|
| **Recall** | 83.02% | ✅ Primary goal |
| **Precision** | 52.52% | ⚠️ Within target |
| **F1-Score** | 64.34% | ⚠️ |
| **F2-Score** | 74.38% | ✅ |
| **ROC-AUC** | 89.00% | ✅ |
| **PR-AUC** | 78.49% | ✅ |
| **MCC** | 0.5318 | ✅ |

#### Confusion Matrix
```
              Predicted
           Legit    Fraud
Actual  ┌─────────┬─────────┐
 Legit  │  13,522 │  3,849  │  (FP)
        ├─────────┼─────────┤
 Fraud  │    871  │  4,258  │  (TP)
        └─────────┴─────────┘
           (FN)
```

---

## Saved Model Artifacts

| File | Contents |
|------|----------|
| `*_stage1.joblib` | BNN model + rule config + thresholds |
| `*_ensemble.joblib` | 3 ML models + scalers + optimal threshold |
| `*_rules.json` | 29 declarative rule conditions |
| `*_feature_config.json` | 235 feature columns + categorical mappings |
| `*_user_merchant_stats.joblib` | 8,000 users, 2,000 merchants stats |
| `*_ensemble_weights.json` | Optimal model weights |
| `*_feature_importance.csv` | Feature importance rankings |

---

## Production Inference

```python
from ml import FraudInferenceSystem

system = FraudInferenceSystem()  # Loads all models
result = system.predict(transaction_dict)

# Returns:
# {
#   "decision": "FRAUD" | "LEGITIMATE" | "FRAUD (HARD BLOCK)",
#   "final_score": 0.0-1.0,
#   "risk_level": "LOW" | "HIGH" | "CRITICAL",
#   "triggered_rules": ["rule_name", ...],
#   "model_scores": {"xgboost": 0.xx, "lightgbm": 0.xx, "catboost": 0.xx}
# }
```

---

## Key Design Decisions

1. **Cascaded Architecture** - Rules first for explainability and speed (~10ms), ML for accuracy
2. **Hard Block at 85%** - Transactions with very high rule scores bypass ML entirely
3. **BNN for Gray Zone** - Learned high-risk identification replaces hardcoded thresholds
4. **F2-Score Optimization** - Prioritizes recall (catching fraud) over precision
5. **Bayesian Hyperparameter Tuning** - 600+ trials for optimal model configuration
