"""
DNS Tunneling Detection - Formal Model Evaluation
"""
import sys
from pathlib import Path
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.data_loader import load_dataset
from src.preprocessing import clean_dataset
from src.feature_extraction import build_feature_dataset
from src.train_models import (
    train_random_forest, 
    train_gradient_boosting, 
    train_hist_gradient_boosting
)
from src.evaluate import generate_evaluation_report

def run_evaluation():
    print("=" * 70)
    print("  FORMAL MODEL EVALUATION PHASE")
    print("=" * 70)

    # 1. Pipeline Execution
    print("1. Loading raw datasets...")
    data_dir = PROJECT_ROOT / "data"
    raw_train = load_dataset(data_dir / "training.csv")
    raw_val = load_dataset(data_dir / "validating.csv")

    print("2. Sanitizing domains (Day 2)...")
    train_df = clean_dataset(raw_train)
    val_df = clean_dataset(raw_val)

    print("3. Building feature matrices (Day 3)...")
    X_train, y_train = build_feature_dataset(train_df)
    X_val, y_val = build_feature_dataset(val_df)
    
    # 4. Training Models
    print("4. Training all models (Random Forest, Gradient Boosting, HistGB)...")
    rf_model = train_random_forest(X_train, y_train, random_state=42)
    gb_model = train_gradient_boosting(X_train, y_train, random_state=42)
    hgb_model = train_hist_gradient_boosting(X_train, y_train, random_state=42)
    
    models = {
        "Random Forest": rf_model,
        "Gradient Boosting": gb_model,
        "Hist Gradient Boosting": hgb_model
    }
    
    # 5. Evaluate
    print("5. Generating predictions and calculating metrics on Validation Set...")
    results_dir = str(PROJECT_ROOT / "results")
    df_results = generate_evaluation_report(models, X_val, y_val, results_dir)
    
    # Display Results
    print("\n" + "=" * 70)
    print("  EVALUATION RESULTS (VALIDATION SET: 5000 RECORDS)")
    print("=" * 70)
    
    pd.set_option('display.max_columns', None)
    pd.set_option('display.width', 1000)
    print(df_results.to_string(index=False))
    
    print("\n" + "=" * 70)
    print(f"  Visualizations and CSV saved to: {results_dir}")
    print("=" * 70)
    
    return True

if __name__ == "__main__":
    success = run_evaluation()
    sys.exit(0 if success else 1)
