import os
import sys
import json
import joblib
import warnings
import numpy as np
import pandas as pd
from datetime import datetime

warnings.filterwarnings('ignore', message='.*Falling back to prediction using DMatrix.*')

# --- PATHS ---
MODEL_DIR = "./models"
PREFIX = "ultimate_fraud_system_fast.joblib"
sys.path.insert(0, MODEL_DIR)

try:
    from feature_engineer import FeatureEngineer
except ImportError:
    print(f"❌ Error: feature_engineer.py not found in {MODEL_DIR}")

class RuleEngine:
    def __init__(self, config_path):
        self.rule_weights = {}
        self.rule_conditions = {}
        if os.path.exists(config_path):
            with open(config_path, 'r') as f:
                config = json.load(f)
            self.rule_weights = config.get('rule_weights', {})
            self.rule_conditions = config.get('rule_conditions', {})
        
    def _evaluate_condition(self, txn, condition):
        op = condition.get('op', '==')
        if op == 'and': return all(self._evaluate_condition(txn, c) for c in condition.get('conditions', []))
        if op == 'or': return any(self._evaluate_condition(txn, c) for c in condition.get('conditions', []))
        field = condition.get('field', ''); value = txn.get(field, 0); target = condition.get('value')
        try:
            if op == 'in': return str(value).upper() in [str(v).upper() for v in target]
            v_num = float(value) if not isinstance(value, str) else 0
            if op == '>': return v_num > target
            if op == '>=': return v_num >= target
            if op == '<': return v_num < target
            if op == '<=': return v_num <= target
            if op == '==': return v_num == target
            if op == 'between': return target[0] <= v_num <= target[1]
        except: return False
        return False

    def evaluate(self, txn_dict):
        triggered = []
        max_score = 0
        for name, cond in self.rule_conditions.items():
            if self._evaluate_condition(txn_dict, cond):
                w = self.rule_weights.get(name, 0)
                triggered.append((name, w))
                max_score = max(max_score, w)
        return max_score, triggered

    def get_rule_signals_ordered(self, txn_dict, rule_names):
        return [1.0 if self._evaluate_condition(txn_dict, self.rule_conditions.get(n, {})) else 0.0 for n in rule_names]

class FraudInferenceSystem:
    def __init__(self):
        print("\n" + "="*50 + "\n🔮 LOADING MODELS INTO MEMORY\n" + "="*50)
        s1 = joblib.load(os.path.join(MODEL_DIR, f"{PREFIX}_stage1.joblib"))
        self.bnn_model = s1.get('bnn_model')
        self.bnn_threshold = s1.get('bnn_threshold', 0.5)
        self.hard_block_threshold = s1.get('hard_block_threshold', 85) / 100.0
        self.bnn_rule_names = s1.get('bnn_rule_names', [])

        s2 = joblib.load(os.path.join(MODEL_DIR, f"{PREFIX}_ensemble.joblib"))
        self.models = s2.get('models', {})
        self.optimal_weights = s2.get('optimal_weights', {})
        self.optimal_threshold = s2.get('optimal_threshold', 0.390)
        self.scaler = s2.get('scaler')
        self.quantile_transformer = s2.get('quantile_transformer')
        self.feature_names = s2.get('feature_names', [])

        self.fe = FeatureEngineer(os.path.join(MODEL_DIR, f"{PREFIX}_feature_config.json"), 
                                  os.path.join(MODEL_DIR, f"{PREFIX}_user_merchant_stats.joblib"))
        self.rule_engine = RuleEngine(os.path.join(MODEL_DIR, f"{PREFIX}_rules.json"))
        print("✅ SYSTEM READY")

#    def predict(self, raw_input):
#        df_engineered, _ = self.fe.engineer_features(pd.DataFrame([raw_input]))
#        full_features = df_engineered[self.feature_names].iloc[0].to_dict()
#        full_features.update({k: v for k, v in raw_input.items() if k not in full_features})
#
#        rule_score, triggered = self.rule_engine.evaluate(full_features)
#        rule_score_norm = rule_score / 100.0
#        
#        if rule_score_norm >= self.hard_block_threshold:
#            return {"decision": "FRAUD (HARD BLOCK)", "final_score": 1.0, "triggered_rules": [r[0] for r in triggered]}
#
#        bnn_sigs = np.array([self.rule_engine.get_rule_signals_ordered(full_features, self.bnn_rule_names)]).reshape(1, -1)
#        bnn_prob = self.bnn_model.predict_proba(bnn_sigs)[0, 1]
#        is_high_risk = bnn_prob >= self.bnn_threshold or rule_score >= 60
#
#        X = pd.DataFrame([full_features])[self.feature_names]
#        X_final = self.quantile_transformer.transform(self.scaler.transform(X))
#        ml_pred = sum(self.models[n].predict_proba(X_final)[0, 1] * self.optimal_weights.get(n, 0) for n in self.models)
#
#        final_score = (ml_pred * 0.65 + rule_score_norm * 0.35) if is_high_risk else (ml_pred * 0.90 + rule_score_norm * 0.10)
#        decision = "FRAUD" if final_score >= self.optimal_threshold else "LEGITIMATE"
#        
#        # Terminal Visuals
#        bar = "█" * int(final_score * 20) + "░" * (20 - int(final_score * 20))
#        print(f"Transaction: {raw_input.get('transaction_id')} | Score: {final_score*100:.1f}% | [{bar}] | {decision}")
#
#        return {
#            "decision": decision,
#            "final_score": round(final_score, 4),
#            "risk_level": "CRITICAL" if final_score > 0.7 else "HIGH" if final_score > 0.5 else "LOW",
#            "triggered_rules": [r[0] for r in triggered]
#        }

    def predict(self, raw_input):
            # 1. Feature Engineering
            df_engineered, _ = self.fe.engineer_features(pd.DataFrame([raw_input]))
            full_features = df_engineered[self.feature_names].iloc[0].to_dict()
            full_features.update({k: v for k, v in raw_input.items() if k not in full_features})

            # 2. Rule Engine
            rule_score, triggered = self.rule_engine.evaluate(full_features)
            rule_score_norm = rule_score / 100.0
            
            if rule_score_norm >= self.hard_block_threshold:
                return {
                    "decision": "FRAUD (HARD BLOCK)", 
                    "final_score": 1.0, 
                    "triggered_rules": [r[0] for r in triggered],
                    "model_scores": {n: 1.0 for n in self.models} # Blocked by rules
                }

            # 3. BNN Risk Check
            bnn_sigs = np.array([self.rule_engine.get_rule_signals_ordered(full_features, self.bnn_rule_names)]).reshape(1, -1)
            bnn_prob = self.bnn_model.predict_proba(bnn_sigs)[0, 1]
            is_high_risk = bnn_prob >= self.bnn_threshold or rule_score >= 60

            # 4. ML Ensemble
            X = pd.DataFrame([full_features])[self.feature_names]
            X_final = self.quantile_transformer.transform(self.scaler.transform(X))
            
            ml_pred = 0.0
            individual_scores = {}
            for name, model in self.models.items():
                # Extract raw probability for each model
                prob = float(model.predict_proba(X_final)[0, 1])
                individual_scores[name] = round(prob, 4)
                
                # Weighted contribution
                ml_pred += prob * self.optimal_weights.get(name, 0)

            # 5. Cascaded Blending
            if is_high_risk:
                final_score = (ml_pred * 0.65 + rule_score_norm * 0.35)
            else:
                final_score = (ml_pred * 0.90 + rule_score_norm * 0.10)
                
            decision = "FRAUD" if final_score >= self.optimal_threshold else "LEGITIMATE"
            
            return {
                "decision": decision,
                "final_score": round(float(final_score), 4),
                "risk_level": "CRITICAL" if final_score > 0.7 else "HIGH" if final_score > 0.5 else "LOW",
                "triggered_rules": [r[0] for r in triggered],
                "model_scores": individual_scores # <--- XGBoost, LightGBM, CatBoost included here
            }