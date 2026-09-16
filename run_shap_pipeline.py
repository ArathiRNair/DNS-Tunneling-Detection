"""
DNS Tunneling Detection - SHAP Explainability Phase
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
from src.train_models import train_random_forest
from src.explainability import (
    compute_shap_values,
    plot_shap_summary_bar,
    plot_shap_summary_beeswarm,
    get_global_feature_importance
)

def run_shap():
    print("=" * 70)
    print("  SHAP EXPLAINABILITY PHASE (RANDOM FOREST)")
    print("=" * 70)

    try:
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
        
        # 4. Training Model
        print("4. Training Random Forest model...")
        rf_model = train_random_forest(X_train, y_train, random_state=42)
        
        # 5. SHAP Explainability
        print("5. Initializing SHAP TreeExplainer and computing values on Validation Set...")
        results_dir = PROJECT_ROOT / "results"
        results_dir.mkdir(parents=True, exist_ok=True)
        
        explainer, shap_values = compute_shap_values(rf_model, X_val)
        
        # Determine actual shap dimensions
        sv_shape = shap_values.shape if hasattr(shap_values, 'shape') else len(shap_values)
        print(f"   SHAP values shape: {sv_shape} | X_val shape: {X_val.shape}")
        
        print("6. Generating global feature importance data...")
        importance_df = get_global_feature_importance(shap_values, X_val)
        
        print("\n" + "=" * 70)
        print("  GLOBAL FEATURE IMPORTANCE (Mean |SHAP| value)")
        print("=" * 70)
        print(importance_df.to_string(index=False))
        
        # Save feature importance to CSV
        csv_path = results_dir / "shap_feature_importance.csv"
        importance_df.to_csv(csv_path, index=False)
        
        print("\n7. Generating SHAP visualizations...")
        plot_shap_summary_bar(shap_values, X_val, results_dir)
        plot_shap_summary_beeswarm(shap_values, X_val, results_dir)
        
        print("\n" + "=" * 70)
        print(f"  [SUCCESS] SHAP outputs saved to: {results_dir}")
        print("=" * 70)
        return True
    
    except Exception as e:
        print(f"\n[FAIL] An error occurred during SHAP extraction: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = run_shap()
    sys.exit(0 if success else 1)
