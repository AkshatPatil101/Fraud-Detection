# Installation Guide

> Complete setup instructions for TechFiesta Fraud Guard

## Prerequisites

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| Python | 3.10+ | `python --version` |
| Node.js | 18.x+ | `node --version` |
| npm | 9.x+ | `npm --version` |
| Git | Latest | `git --version` |

---

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/AkshatPatil101/Fraud-Detection.git
cd Fraud-Detection
```

---

## Backend Setup

### 2. Create Virtual Environment

```bash
cd Backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install --upgrade pip

# Core dependencies
pip install fastapi uvicorn pandas numpy joblib

# ML libraries
pip install xgboost lightgbm catboost scikit-learn
```

#### Full Requirements

For complete functionality, install these additional packages:

```bash
pip install scipy tqdm matplotlib seaborn optuna networkx
```

### 4. Verify Model Files

Ensure these files exist in `Backend/models/`:

| File | Purpose |
|------|---------|
| `ultimate_fraud_system_fast.joblib_stage1.joblib` | BNN model + rules |
| `ultimate_fraud_system_fast.joblib_ensemble.joblib` | ML models + weights |
| `ultimate_fraud_system_fast.joblib_rules.json` | Rule definitions |
| `ultimate_fraud_system_fast.joblib_feature_config.json` | Feature config |
| `feature_engineer.py` | Feature engineering |

### 5. Start Backend Server

```bash
python main.py
```

**Expected Output:**
```
==================================================
🔮 LOADING MODELS INTO MEMORY
==================================================
✅ SYSTEM READY
INFO:     Uvicorn running on http://0.0.0.0:8000
```

> ✅ Backend running at: **http://localhost:8000**

---

## Frontend Setup

### 6. Install Node Dependencies

Open a **new terminal**:

```bash
cd Frontend
npm install
```

### 7. Start Development Server

```bash
npm run dev
```

**Expected Output:**
```
  VITE v7.2.4  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

> ✅ Frontend running at: **http://localhost:5173**

---

## Production Build

### Backend (Uvicorn with workers)

```bash
cd Backend
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend (Static build)

```bash
cd Frontend
npm run build
npm run preview  # Test production build locally
```

The built files will be in `Frontend/dist/`.

---

## Environment Variables (Optional)

Create `.env` files for configuration:

### Backend `.env`
```env
# Not required - uses defaults
LOG_LEVEL=INFO
MODEL_PATH=./models
```

### Frontend `.env`
```env
VITE_API_URL=http://localhost:8000
```

---

## Troubleshooting

### Common Issues

#### "Module not found: feature_engineer"

```bash
# Ensure you're in Backend directory
cd Backend
python -c "import sys; sys.path.insert(0, './models'); from feature_engineer import FeatureEngineer; print('✅ OK')"
```

#### "Model file not found"

Verify model files exist:
```bash
ls Backend/models/
# Should show .joblib and .json files
```

#### "Port already in use"

```bash
# Find and kill process (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# (macOS/Linux)
lsof -i :8000
kill -9 <PID>
```

#### CORS errors in browser

Verify backend is running on port 8000 and frontend can reach it:
```bash
curl http://localhost:8000/docs
# Should return OpenAPI docs
```

---

## API Documentation

Once backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## System Requirements (Recommended)

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| RAM | 4 GB | 8 GB |
| CPU | 2 cores | 4 cores |
| Disk | 500 MB | 1 GB |
| GPU | Not required | NVIDIA (for training) |

---

## Docker Setup (Alternative)

If you prefer Docker:

```bash
# Backend
cd Backend
docker build -t fraud-api .
docker run -p 8000:8000 fraud-api

# Frontend
cd Frontend
docker build -t fraud-frontend .
docker run -p 5173:5173 fraud-frontend
```

---

## Next Steps

1. ✅ Backend running on http://localhost:8000
2. ✅ Frontend running on http://localhost:5173
3. 📖 Read [API Reference](api-reference.md) for endpoint usage
4. 🧠 Explore [ML Pipeline](ml-pipeline.md) for architecture details
5. 📋 Review [Rules Engine](rules-engine.md) for fraud detection rules
