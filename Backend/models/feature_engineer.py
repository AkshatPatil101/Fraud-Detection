"""
FEATURE ENGINEERING MODULE
==========================
Standalone feature engineering class that can be used for both training and inference.
Loads configuration from JSON files saved during training.

Usage:
    from feature_engineer import FeatureEngineer
    
    fe = FeatureEngineer(config_path='feature_config.json', stats_path='user_merchant_stats.joblib')
    df_engineered, feature_cols = fe.engineer_features(raw_df)
"""

import os
import json
import joblib
import pandas as pd
import numpy as np

# Optional NetworkX for graph features
try:
    import networkx as nx
    NETWORKX_AVAILABLE = True
except ImportError:
    NETWORKX_AVAILABLE = False


class FeatureEngineer:
    """
    Standalone Feature Engineering Class
    Loads configuration from saved files (production mode)
    Creates 109+ features from raw transaction data
    """
    
    def __init__(self, config_path=None, stats_path=None):
        """
        Initialize from config files
        
        Args:
            config_path: Path to feature_config.json
            stats_path: Path to user_merchant_stats.joblib
        """
        self.user_stats = {}
        self.merchant_stats = {}
        self.global_stats = {}
        self.categorical_columns = {}
        self.training_columns = None
        self.high_risk_countries = ['BR', 'NG', 'RU', 'CN', 'VE', 'IR', 'KP', 'SD', 'SY', 'PK']
        
        # Load from config files
        if config_path and os.path.exists(config_path):
            self._load_config(config_path)
            print(f"✅ Feature config loaded: {config_path}")
        
        if stats_path and os.path.exists(stats_path):
            self._load_stats(stats_path)
            print(f"✅ User/Merchant stats loaded: {stats_path}")
    
    def _load_config(self, config_path):
        """Load feature engineering config from JSON"""
        with open(config_path, 'r') as f:
            config = json.load(f)
        
        self.global_stats = config.get('global_stats', {})
        self.categorical_columns = config.get('categorical_columns', {})
        self.training_columns = config.get('training_columns', [])
        self.high_risk_countries = config.get('high_risk_countries', self.high_risk_countries)
        
        print(f"   📊 Total training features: {len(self.training_columns)}")
    
    def _load_stats(self, stats_path):
        """Load user/merchant statistics from joblib"""
        stats = joblib.load(stats_path)
        self.user_stats = stats.get('user_stats', {})
        self.merchant_stats = stats.get('merchant_stats', {})
        
        print(f"   👤 Users in stats: {len(self.user_stats)}")
        print(f"   🏪 Merchants in stats: {len(self.merchant_stats)}")
    
    def _create_graph_features(self, df):
        """Create graph network features"""
        if not NETWORKX_AVAILABLE:
            return df
        
        if 'user_id' in df.columns and 'device_id' in df.columns:
            try:
                edge_df = pd.DataFrame({
                    'source': 'U_' + df['user_id'].astype(str),
                    'target': 'D_' + df['device_id'].astype(str)
                })
                G_device = nx.from_pandas_edgelist(edge_df, 'source', 'target')
                centrality = nx.degree_centrality(G_device)
                df['user_device_centrality'] = df['user_id'].apply(lambda x: centrality.get(f"U_{x}", 0))
                clustering = nx.clustering(G_device)
                df['user_device_clustering'] = df['user_id'].apply(lambda x: clustering.get(f"U_{x}", 0))
            except:
                df['user_device_centrality'] = 0
                df['user_device_clustering'] = 0
        
        if 'user_id' in df.columns and 'ip_address' in df.columns:
            ip_counts = df.groupby('ip_address')['user_id'].nunique().to_dict()
            df['users_per_ip'] = df['ip_address'].map(ip_counts).fillna(1)
            df['is_suspicious_ip'] = (df['users_per_ip'] > 10).astype(int)
        
        if 'user_id' in df.columns and 'merchant_id' in df.columns:
            merchant_diversity = df.groupby('user_id')['merchant_id'].nunique().to_dict()
            df['user_merchant_diversity'] = df['user_id'].map(merchant_diversity).fillna(1)
        
        return df
    
    def engineer_features(self, df):
        """
        Apply feature engineering to create 109+ features
        
        Args:
            df: DataFrame with raw transaction data
            
        Returns:
            df_engineered: DataFrame with all engineered features
            feature_cols: List of feature column names (matching training order)
        """
        df = df.copy()
        
        # ============ 1. TEMPORAL FEATURES ============
        if 'timestamp' in df.columns:
            df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
            df['hour'] = df['timestamp'].dt.hour
            df['day_of_week'] = df['timestamp'].dt.dayofweek
            df['day_of_month'] = df['timestamp'].dt.day
            df['month'] = df['timestamp'].dt.month
            df['year'] = df['timestamp'].dt.year
            df['quarter'] = df['timestamp'].dt.quarter
            df['week_of_year'] = df['timestamp'].dt.isocalendar().week
            df['is_weekend'] = (df['day_of_week'] >= 5).astype(int)
            df['is_month_start'] = df['timestamp'].dt.is_month_start.astype(int)
            df['is_month_end'] = df['timestamp'].dt.is_month_end.astype(int)
            df['is_night'] = ((df['hour'] >= 22) | (df['hour'] <= 5)).astype(int)
            df['is_business_hours'] = ((df['hour'] >= 9) & (df['hour'] <= 17)).astype(int)
            df['is_late_night'] = ((df['hour'] >= 23) | (df['hour'] <= 3)).astype(int)
            
            # Cyclical encoding
            df['hour_sin'] = np.sin(2 * np.pi * df['hour'] / 24)
            df['hour_cos'] = np.cos(2 * np.pi * df['hour'] / 24)
            df['day_sin'] = np.sin(2 * np.pi * df['day_of_week'] / 7)
            df['day_cos'] = np.cos(2 * np.pi * df['day_of_week'] / 7)
            df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)
            df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)
        
        # User tenure
        if 'timestamp' in df.columns and 'user_signup_date' in df.columns:
            df['user_signup_date'] = pd.to_datetime(df['user_signup_date'], errors='coerce')
            df['user_tenure_days'] = (df['timestamp'] - df['user_signup_date']).dt.total_seconds() / 86400
            df['user_tenure_days'] = df['user_tenure_days'].fillna(0).clip(0, 10000)
            df['user_tenure_log'] = np.log1p(df['user_tenure_days'])
            df['user_tenure_sqrt'] = np.sqrt(df['user_tenure_days'])
            df['is_new_user'] = (df['user_tenure_days'] < 30).astype(int)
        
        # ============ 2. AMOUNT FEATURES ============
        if 'amount' in df.columns:
            df['amount_log'] = np.log1p(df['amount'])
            df['amount_sqrt'] = np.sqrt(df['amount'])
            df['amount_squared'] = df['amount'] ** 2
            df['amount_percentile'] = df['amount'].rank(pct=True)
            df['is_round_amount'] = (df['amount'] % 10 == 0).astype(int)
            df['is_very_round_amount'] = (df['amount'] % 100 == 0).astype(int)
            
            amount_mean = self.global_stats.get('amount_mean', df['amount'].mean())
            amount_std = self.global_stats.get('amount_std', df['amount'].std())
            df['amount_vs_global_mean'] = df['amount'] / (amount_mean + 1e-6)
            df['amount_zscore_global'] = (df['amount'] - amount_mean) / (amount_std + 1e-6)
        
        # ============ 3. USER BEHAVIORAL FEATURES ============
        for col in ['user_total_txn_amount', 'user_total_txn_count', 'user_past_fraud_count', 'days_since_last_txn']:
            if col not in df.columns:
                df[col] = 0

        df['user_avg_txn_amount'] = df['user_total_txn_amount'] / (df['user_total_txn_count'] + 1)
        df['user_txn_frequency'] = 1 / (df['days_since_last_txn'] + 1)
        
        if 'amount' in df.columns:
            df['amount_vs_user_avg'] = df['amount'] / (df['user_avg_txn_amount'] + 1e-6)
            
            # Initialize user statistics columns
            for col in ['user_amount_mean', 'user_amount_std', 'user_amount_min', 
                       'user_amount_max', 'user_amount_median', 'user_amount_sum', 'user_txn_count_new']:
                df[col] = 0
            
            # Lookup user statistics
            if 'user_id' in df.columns:
                for idx, row in df.iterrows():
                    user_id = row['user_id']
                    if user_id in self.user_stats:
                        stats = self.user_stats[user_id]
                        df.at[idx, 'user_amount_mean'] = stats.get('mean', 0)
                        df.at[idx, 'user_amount_std'] = stats.get('std', 0)
                        df.at[idx, 'user_amount_min'] = stats.get('min', 0)
                        df.at[idx, 'user_amount_max'] = stats.get('max', 0)
                        df.at[idx, 'user_amount_median'] = stats.get('median', 0)
                        df.at[idx, 'user_amount_sum'] = stats.get('sum', 0)
                        df.at[idx, 'user_txn_count_new'] = stats.get('count', 0)
            
            df['amount_zscore'] = (df['amount'] - df['user_amount_mean']) / (df['user_amount_std'] + 1e-6)
            df['amount_zscore'] = df['amount_zscore'].fillna(0).clip(-10, 10)
            df['amount_is_outlier'] = (df['amount_zscore'].abs() > 3).astype(int)
        
        df['user_fraud_ratio'] = df['user_past_fraud_count'] / (df['user_total_txn_count'] + 1)
        df['user_has_fraud_history'] = (df['user_past_fraud_count'] > 0).astype(int)
        
        # ============ 4. LOCATION FEATURES ============
        for col in ['billing_country', 'shipping_country', 'user_country', 'merchant_country']:
            if col not in df.columns:
                df[col] = 'UNKNOWN'

        df['billing_shipping_match'] = (df['billing_country'] == df['shipping_country']).astype(int)
        df['user_billing_match'] = (df['user_country'] == df['billing_country']).astype(int)
        df['user_merchant_match'] = (df['user_country'] == df['merchant_country']).astype(int)
        
        for col in ['billing_country', 'shipping_country', 'merchant_country', 'user_country']:
            df[f'is_high_risk_{col}'] = df[col].isin(self.high_risk_countries).astype(int)
        
        # ============ 5. MERCHANT FEATURES ============
        if 'merchant_id' in df.columns:
            for col in ['merchant_avg_amount', 'merchant_std_amount', 'merchant_median_amount', 
                       'merchant_txn_count', 'merchant_fraud_rate']:
                df[col] = 0
            
            for idx, row in df.iterrows():
                merchant_id = row['merchant_id']
                if merchant_id in self.merchant_stats:
                    stats = self.merchant_stats[merchant_id]
                    df.at[idx, 'merchant_avg_amount'] = stats.get('mean', 0)
                    df.at[idx, 'merchant_std_amount'] = stats.get('std', 0)
                    df.at[idx, 'merchant_median_amount'] = stats.get('median', 0)
                    df.at[idx, 'merchant_txn_count'] = stats.get('count', 0)
                    df.at[idx, 'merchant_fraud_rate'] = stats.get('fraud_rate', 0)
            
            df['amount_vs_merchant_avg'] = df['amount'] / (df['merchant_avg_amount'] + 1e-6)
            df['merchant_risk_score'] = df['merchant_fraud_rate'] * 100
        
        # ============ 6. DEVICE & CHANNEL FEATURES ============
        if 'device_type' in df.columns:
            df['is_mobile'] = (df['device_type'] == 'mobile').astype(int)
            df['is_desktop'] = (df['device_type'] == 'desktop').astype(int)
        
        # ============ 7. GRAPH NETWORK FEATURES ============
        df = self._create_graph_features(df)
        
        # ============ 8. RISK FLAGS & COMPOSITE SCORES ============
        df['composite_risk_score'] = (
            df.get('is_high_risk_billing_country', 0) * 2 +
            df.get('user_fraud_ratio', 0) * 10 +
            df.get('is_night', 0) * 1
        )
        
        if 'amount' in df.columns:
            amount_q90 = self.global_stats.get('amount_q90', df['amount'].quantile(0.9))
            df['composite_risk_score'] += (df['amount'] > amount_q90).astype(int) * 2
        
        # ============ 9. ONE-HOT ENCODING ============
        low_card_categoricals = [
            'currency', 'transaction_type', 'channel', 'payment_method',
            'device_type', 'browser', 'merchant_category', 'kyc_status'
        ]
        
        # Create all dummy columns at once to avoid DataFrame fragmentation
        dummy_dfs = []
        for col in low_card_categoricals:
            if col in df.columns and col in self.categorical_columns:
                all_values = self.categorical_columns[col]
                for value in all_values[1:]:  # Skip first value (drop_first=True)
                    dummy_col_name = f"{col}_{value}"
                    dummy_dfs.append(pd.DataFrame({dummy_col_name: (df[col] == value).astype(int)}))
        
        # Concatenate all dummy columns at once
        if dummy_dfs:
            df = pd.concat([df] + dummy_dfs, axis=1)

        
        # ============ 10. ENSURE ALL TRAINING COLUMNS EXIST ============
        if self.training_columns:
            # Find missing columns and add them all at once (avoids fragmentation)
            missing_cols = [col for col in self.training_columns if col not in df.columns]
            if missing_cols:
                missing_df = pd.DataFrame(0, index=df.index, columns=missing_cols)
                df = pd.concat([df, missing_df], axis=1)
            
            # Return features in training column order
            return df, self.training_columns
        
        # Fallback: return all numeric columns
        exclude_cols = [
            'transaction_id', 'timestamp', 'user_signup_date',
            'is_fraud', 'fraud_type', 'latitude', 'longitude',
            'user_id', 'merchant_id', 'device_id', 'ip_address',
            'email', 'billing_city', 'shipping_city'
        ]
        
        feature_cols = [col for col in df.columns 
                        if col not in exclude_cols and pd.api.types.is_numeric_dtype(df[col])]
        
        return df, feature_cols
