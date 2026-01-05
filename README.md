<div align="center">

# 🛡️ TechFiesta Fraud Guard

### AI-Powered Real-Time Fraud Detection System

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**A cascaded machine learning fraud detection system featuring a Rule Engine, Bayesian Neural Network, and an optimized XGBoost/LightGBM/CatBoost ensemble.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API](#-api-documentation) • [Architecture](#-ml-pipeline-architecture)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [ML Pipeline Architecture](#-ml-pipeline-architecture)
- [Frontend Pages](#-frontend-pages)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔍 **Intelligent Detection**
- **Cascaded ML Pipeline** - Rules → BNN → Ensemble
- **Hard Block Rules** - Instant fraud flagging
- **Bayesian Risk Assessment** - Probability-based filtering
- **Multi-Model Ensemble** - XGBoost, LightGBM, CatBoost

</td>
<td width="50%">

### 📊 **Real-Time Dashboard**
- **Command Center** - Live transaction monitoring
- **Detection Analytics** - Fraud trend visualization
- **Alert Management** - Priority-based queue
- **Risk Scoring Engine** - Transaction risk assessment

</td>
</tr>
<tr>
<td width="50%">

### 🛠️ **Developer Friendly**
- **FastAPI Backend** - High-performance REST API
- **React 19 Frontend** - Modern component architecture
- **Hot Reload** - Vite-powered development
- **Modular Codebase** - Clean separation of concerns

</td>
<td width="50%">

### 📈 **Enterprise Ready**
- **Compliance Reporting** - Regulatory documentation
- **Protected Routes** - Secure authentication flow
- **Error Boundaries** - Graceful error handling
- **Responsive Design** - Mobile-first UI

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.10+ | Core runtime |
| FastAPI | 0.100+ | REST API framework |
| Uvicorn | Latest | ASGI server |
| Pandas | 2.0+ | Data manipulation |
| NumPy | 1.24+ | Numerical computing |
| Joblib | Latest | Model serialization |
| XGBoost | Latest | Gradient boosting |
| LightGBM | Latest | Gradient boosting |
| CatBoost | Latest | Gradient boosting |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2 | UI framework |
| Vite | 7.2 | Build tool & dev server |
| TailwindCSS | 3.4 | Utility-first styling |
| React Router | 7.11 | Client-side routing |
| Recharts | 3.6 | Data visualization |
| Lucide React | 0.562 | Icon library |

---

## 🚀 Installation

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Python | 3.10 or higher |
| Node.js | 18.x or higher |
| npm | 9.x or higher |
| Git | Latest |

### Quick Start

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AkshatPatil101/Fraud-Detection.git
cd Fraud-Detection
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend
cd Backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn pandas numpy joblib xgboost lightgbm catboost

# Start the server
python main.py
```

> 🟢 Backend runs at: `http://localhost:8000`

#### 3️⃣ Frontend Setup

```bash
# Open new terminal, navigate to frontend
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

> 🟢 Frontend runs at: `http://localhost:5173`

---

## 📡 API Documentation

### `POST /predict`

Analyze a transaction for fraud.

**Request Body:**

```json
{
  "transaction": {
    "transaction_id": "TXN_123456",
    "amount": 1500.00,
    "merchant_category": "ELECTRONICS",
    "user_id": "USR_001",
    "timestamp": "2026-01-05T10:30:00",
    "location": "Mumbai",
    "payment_method": "CARD"
  }
}
```

**Response:**

```json
{
  "decision": "FRAUD",
  "final_score": 0.7823,
  "risk_level": "CRITICAL",
  "triggered_rules": ["high_amount_electronics", "velocity_check"],
  "model_scores": {
    "xgboost": 0.8123,
    "lightgbm": 0.7654,
    "catboost": 0.7891
  }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `decision` | string | `FRAUD`, `LEGITIMATE`, or `FRAUD (HARD BLOCK)` |
| `final_score` | float | Combined fraud probability (0-1) |
| `risk_level` | string | `LOW`, `HIGH`, or `CRITICAL` |
| `triggered_rules` | array | List of rule names that fired |
| `model_scores` | object | Individual model probabilities |

---

## 📁 Project Structure

```
Fraud-Detection/
├── 📂 Backend/
│   ├── main.py                    # FastAPI application entry point
│   ├── ml.py                      # FraudInferenceSystem & RuleEngine
│   └── 📂 models/
│       ├── feature_engineer.py    # Feature engineering pipeline
│       ├── *.joblib              # Serialized ML models
│       └── *.json                # Rule configs & feature configs
│
├── 📂 Frontend/
│   ├── index.html                # Application entry
│   ├── package.json              # Dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.cjs       # TailwindCSS theme
│   └── 📂 src/
│       ├── App.jsx               # Root component
│       ├── Routes.jsx            # Route definitions
│       ├── 📂 components/        # Reusable UI components
│       ├── 📂 pages/             # Page components (8 modules)
│       ├── 📂 styles/            # Global CSS
│       └── 📂 utils/             # Utility functions
│
├── 📂 ML_Model_Training_Files/
│   ├── TechFiesta_2026_Fraud_Detection_System_Training_Pipeline.ipynb
│   ├── inference_demo.ipynb      # Model inference examples
│   ├── feature_engineer.py       # Training feature pipeline
│   └── *.joblib / *.json        # Training artifacts
│
└── .gitignore
```

---

## 🧠 ML Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     TRANSACTION INPUT                            │
└─────────────────────────────────────┬───────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  Stage 1: RULE ENGINE                                            │
│  ├── Evaluate 10+ fraud rules                                    │
│  └── Score >= 85% → HARD BLOCK (instant fraud flag)             │
└─────────────────────────────────────┬───────────────────────────┘
                                      │ Score < 85%
                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  Stage 2: BAYESIAN NEURAL NETWORK (BNN)                          │
│  ├── Input: Rule signal vector                                   │
│  └── Output: Risk probability → determines blend ratio           │
└─────────────────────────────────────┬───────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  Stage 3: ML ENSEMBLE                                            │
│  ├── XGBoost  ──┐                                                │
│  ├── LightGBM ──┼── Weighted Average (optimized via Bayesian)   │
│  └── CatBoost ──┘                                                │
└─────────────────────────────────────┬───────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│  CASCADED BLENDING                                               │
│  ├── High Risk:  65% ML + 35% Rules                             │
│  └── Low Risk:   90% ML + 10% Rules                             │
└─────────────────────────────────────┬───────────────────────────┘
                                      │
                                      ▼
                            ┌─────────────────┐
                            │  FINAL VERDICT  │
                            │ FRAUD/LEGITIMATE│
                            └─────────────────┘
```

---

## 🖥️ Frontend Pages

| Page | Route | Description |
|------|-------|-------------|
| Login/Signup | `/login`, `/signup` | Authentication screens |
| Command Dashboard | `/command-dashboard` | Protected main dashboard |
| Detection Analytics | `/detection-analytics` | Fraud trend charts |
| Alert Management | `/alert-management-center` | Alert queue |
| Risk Scoring | `/risk-scoring-engine` | Transaction risk tools |
| Compliance | `/compliance-reporting` | Regulatory reports |
| Fraud Form | `/fraud-detection-form` | Manual transaction testing |
| Homepage | `/homepage` | Landing page |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Built with ❤️ for TechFiesta 2026**

</div>
