# DNS Tunneling Detection Using Machine Learning

An end-to-end machine learning project designed to detect **DNS Tunneling** and malicious data exfiltration from domain query names. Built with modular Python architecture, explainable AI (SHAP), a FastAPI backend, and a modern React frontend.

---

## 1. What is DNS Tunneling?

The **Domain Name System (DNS)** is often called the "phonebook of the Internet" — it translates human-readable domain names into computer-readable IP addresses.

Because DNS traffic is required for almost all Internet activity, organizations rarely block DNS port 53. Cyber attackers exploit this by using **DNS Tunneling**:
- Attackers take sensitive internal data, encode it, and embed it inside a DNS query:
  `exfiltrated-data-payload.attacker-server.com`
- When the DNS resolver queries the attacker's authoritative name server, the attacker receives the encoded payload.

### Goal of This Project
Develop and evaluate machine learning models that can distinguish **normal (benign)** DNS queries from **DNS Tunneling attacks** by analyzing domain characteristics, exposing the best model via a live REST API, and presenting the findings in an academic UI.

---

## 2. Project Architecture & Directory Layout

```text
DNS-Tunneling-Detection/
├── data/                  # Headerless raw datasets (training.csv & validating.csv)
├── src/                   # Core Python modules
│   ├── data_loader.py     # Reads headerless CSVs into standard DataFrames
│   ├── preprocessing.py   # Cleans and normalizes domain strings
│   ├── feature_extraction.py # Extracts the exactly 8 lexical features
│   ├── entropy.py         # Computes Shannon Entropy (measures randomness)
│   ├── train_models.py    # Trains RF, GB, and HGB classifiers
│   ├── evaluate.py        # Computes metrics and Confusion Matrices
│   ├── explainability.py  # Generates global SHAP interpretability plots
│   ├── predict.py         # Live single-domain inference pipeline
│   └── api.py             # FastAPI REST endpoint
├── frontend/              # Vite + React User Interface
├── models/                # Serialized trained model artifacts (.joblib)
├── results/               # Generated evaluation plots, SHAP graphs, metrics
├── tests/                 # Automated test files (test_predict.py, test_api.py, etc.)
├── venv/                  # Dedicated Python 3.12 virtual environment
├── requirements.txt       # Python backend dependencies
└── README.md              # Project documentation
```

---

## 3. Extracted Features
The project extracts exactly 8 deterministic mathematical features from each domain:
1. `domain_length`
2. `subdomain_length`
3. `label_count`
4. `digit_count`
5. `digit_ratio`
6. `special_char_count`
7. `domain_entropy`
8. `subdomain_entropy`

---

## 4. Machine Learning Models
Three models were trained and formally evaluated on the validation set:
1. **Random Forest (Primary Model)**
2. **Gradient Boosting**
3. **HistGradientBoosting**

The best-performing model (Random Forest) was persisted and is utilized by the live API. Global model explainability is generated using the **SHAP TreeExplainer**.

---

## 5. Startup Instructions

### Backend (FastAPI)
Open PowerShell or Command Prompt in the project root directory, activate the environment, and start the API:
```powershell
.\venv\Scripts\Activate.ps1
uvicorn src.api:app --reload --port 8000
```
The API serves a `POST /predict` endpoint that accepts `{"domain": "example.com"}`.

### Frontend (React)
Open a new terminal in the project root, navigate to the frontend directory, and start Vite:
```powershell
cd frontend
npm run dev
```
Navigate to `http://localhost:5173` in your web browser. The frontend securely communicates with the backend, visualizes the prediction confidence, maps the 8 features, and displays the static global SHAP explainability charts.
