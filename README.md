# DNS Tunneling Detection Using Machine Learning

An end-to-end machine learning project designed to detect **DNS Tunneling** and malicious data exfiltration from domain query names. Built with modular Python architecture, explainable AI (SHAP), and comprehensive evaluation metrics for academic presentation.

---

## 1. What is DNS Tunneling? (Beginner-Friendly Explanation)

The **Domain Name System (DNS)** is often called the "phonebook of the Internet" — it translates human-readable domain names (like `example.com`) into computer-readable IP addresses (like `93.184.216.34`).

Because DNS traffic is required for almost all Internet activity, organizations rarely block DNS port 53. Cyber attackers exploit this by using **DNS Tunneling**:
- Attackers take sensitive internal data (like passwords or documents), encode it (e.g., in Base64 or Hex), and embed it inside a DNS query:
  `exfiltrated-data-payload.attacker-server.com`
- When the DNS resolver queries the attacker's authoritative name server, the attacker receives the encoded payload.
- In reverse, attackers can send malicious commands back to malware running inside the network (Command & Control / C2).

### Goal of This Project
Develop and evaluate machine learning models that can distinguish **normal (benign)** DNS queries from **DNS Tunneling attacks** by analyzing domain characteristics (such as character randomness, entropy, length, and lexical patterns).

---

## 2. Project Architecture & Directory Layout

```text
DNS-Tunneling-Detection/
│
├── data/                  # Headerless raw datasets (training.csv & validating.csv)
├── src/                   # Core Python modules
│   ├── __init__.py        # Package initialization
│   ├── data_loader.py     # Reads headerless CSVs into standard DataFrames
│   ├── preprocessing.py  # Cleans and normalizes domain strings
│   ├── feature_extraction.py # Extracts lexical and statistical domain properties
│   ├── entropy.py         # Computes Shannon Entropy (measures randomness)
│   ├── train_models.py    # Trains classifiers (Random Forest, etc.)
│   ├── evaluate.py        # Computes Precision, Recall, F1, ROC-AUC & Confusion Matrix
│   └── explainability.py  # Generates SHAP interpretability plots
│
├── models/                # Serialized trained model artifacts (.joblib)
├── results/               # Generated evaluation plots, confusion matrices, and metrics
├── notebooks/             # Jupyter notebooks for interactive analysis & visualization
├── venv/                  # Dedicated Python 3.12 virtual environment
├── main.py                # Day 1 verification entry point / CLI
├── requirements.txt       # Project dependency specifications
├── README.md              # Project documentation and academic guide
└── .gitignore             # Git exclusions (preserves data/ while ignoring binaries)
```

---

## 3. Dataset Specifications

The datasets are stored in `data/` without headers:

| File | Number of Records | Columns | Column 0 (Label) | Column 1 (Domain) |
| :--- | :--- | :--- | :--- | :--- |
| `training.csv` | **15,000** | 2 | `0` = Benign, `1` = DNS Tunnel | Domain name string |
| `validating.csv` | **5,000** | 2 | `0` = Benign, `1` = DNS Tunnel | Domain name string |

> **Important**: Do not add column headers directly to the raw CSV files. The `src/data_loader.py` module will assign column names programmatically.

---

## 4. Environment & Dependencies

- **Python Version**: Python 3.12 (64-bit)
- **Virtual Environment**: `venv`

### Core Libraries:
* `pandas`: Efficient tabular data manipulation.
* `numpy`: Fast mathematical operations and vectorization.
* `scikit-learn`: Supervised classification algorithms, evaluation metrics, and preprocessing pipelines.
* `shap`: SHapley Additive exPlanations for model interpretability.
* `matplotlib`: Foundational data plotting library.
* `seaborn`: Statistical data visualizations and confusion matrix heatmaps.
* `joblib`: High-performance serialization for trained model pipelines.

---

## 5. Getting Started (Day 1 Verification)

### Step 1: Activate Virtual Environment
Open PowerShell or Command Prompt in the project root directory:

```powershell
# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Or Command Prompt:
.\venv\Scripts\activate.bat
```

### Step 2: Run Setup Verification
Run the verification script to confirm that the environment, dependencies, and modules are functioning properly:

```powershell
python main.py
```

---

## 6. Project Roadmap

| Phase | Milestone | Focus |
| :--- | :--- | :--- |
| **Day 1** | **Project Setup & Environment** | Folder layout, Python 3.12 venv, package installation, verification. |
| **Day 2** | **Data Loading & Preprocessing** | Ingest `training.csv` and `validating.csv`, handle missing values, validate balance. |
| **Day 3** | **Feature Engineering & Entropy** | Implement Shannon entropy and lexical feature extraction pipelines. |
| **Day 4** | **Model Training & Comparison** | Train baseline and tree-based classifiers (Random Forest, Logistic Regression). |
| **Day 5** | **Evaluation & Metrics** | Compute Precision, Recall, F1, ROC curves, and Confusion Matrices. |
| **Day 6** | **Model Explainability (SHAP)** | Interpret feature importances and domain classifications. |
