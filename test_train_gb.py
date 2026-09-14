"""
DNS Tunneling Detection - Test Gradient Boosting Training
-------------------------------------------------------
Verifies that the Gradient Boosting model can be trained successfully
on the Day 3 feature matrices without throwing errors, and can
generate predictions on the validation set.
"""
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.data_loader import load_dataset
from src.preprocessing import clean_dataset
from src.feature_extraction import build_feature_dataset
from src.train_models import train_gradient_boosting

def test_gb_training():
    print("=" * 70)
    print("  TEST: GRADIENT BOOSTING TRAINING")
    print("=" * 70)

    try:
        # 1. Load Data
        print("1. Loading raw datasets...")
        data_dir = PROJECT_ROOT / "data"
        raw_train = load_dataset(data_dir / "training.csv")
        raw_val = load_dataset(data_dir / "validating.csv")

        # 2. Clean Data
        print("2. Sanitizing domains (Day 2)...")
        train_df = clean_dataset(raw_train)
        val_df = clean_dataset(raw_val)

        # 3. Extract Features
        print("3. Building feature matrices (Day 3)...")
        X_train, y_train = build_feature_dataset(train_df)
        X_val, y_val = build_feature_dataset(val_df)
        
        print(f"   X_train shape: {X_train.shape} | y_train shape: {y_train.shape}")
        print(f"   X_val shape:   {X_val.shape}  | y_val shape:   {y_val.shape}")

        if X_train.shape != (15000, 8) or X_val.shape != (5000, 8):
            print("[FAIL] Feature matrix dimensions are incorrect.")
            return False

        # 4. Train Model
        print("4. Training GradientBoostingClassifier...")
        model = train_gradient_boosting(X_train, y_train, random_state=42)
        print("   Model trained successfully.")

        # 5. Predict on Validation Set
        print("5. Generating predictions on X_val...")
        predictions = model.predict(X_val)
        print(f"   Prediction shape: {predictions.shape}")

        if predictions.shape != (5000,):
            print("[FAIL] Output prediction shape is incorrect.")
            return False

        print("\n======================================================================")
        print("  [SUCCESS] Gradient Boosting training pipeline test PASSED!")
        print("======================================================================")
        return True

    except Exception as e:
        print(f"\n[FAIL] An error occurred during training/testing: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = test_gb_training()
    sys.exit(0 if success else 1)
