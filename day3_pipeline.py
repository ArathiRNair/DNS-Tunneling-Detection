"""
DNS Tunneling Detection - Day 3 Batch 3 Feature Matrix Creation
"""
import sys
import pandas as pd
import numpy as np
from pathlib import Path

# Add project root to path for modular imports
PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.data_loader import load_dataset
from src.preprocessing import clean_dataset
from src.feature_extraction import build_feature_dataset

def print_banner(title: str, char: str = "=", width: int = 70) -> None:
    print("\n" + char * width)
    print(f"  {title}")
    print(char * width)

def print_section(title: str) -> None:
    print(f"\n--- {title} ---")

def run_day3_pipeline():
    print_banner("DAY 3 BATCH 3: FEATURE MATRIX CREATION")
    
    data_dir = PROJECT_ROOT / "data"
    train_path = data_dir / "training.csv"
    val_path = data_dir / "validating.csv"
    
    print("Loading and cleaning datasets (Day 2 Pipeline)...")
    raw_train = load_dataset(train_path)
    raw_val = load_dataset(val_path)
    
    train_df = clean_dataset(raw_train)
    val_df = clean_dataset(raw_val)
    
    print_banner("EXTRACTING FEATURES (DAY 3)")
    print("Building X_train and y_train (15,000 records)...")
    X_train, y_train = build_feature_dataset(train_df)
    
    print("Building X_val and y_val (5,000 records)...")
    X_val, y_val = build_feature_dataset(val_df)
    
    # Validation
    print_section("Validating Output Matrices")
    
    def validate_matrices(X, y, name, expected_rows):
        status = True
        print(f"  Validating {name}:")
        
        # Exact 8 features
        cols = list(X.columns)
        if len(cols) == 8:
            print(f"    - Features Count: 8 [PASS]")
        else:
            print(f"    - Features Count: {len(cols)} (Expected 8) [FAIL]")
            status = False
            
        # Feature names and order
        expected_cols = ["domain_length", "subdomain_length", "label_count", 
                         "digit_count", "digit_ratio", "special_char_count", 
                         "domain_entropy", "subdomain_entropy"]
        if cols == expected_cols:
            print(f"    - Feature Order: Exact match [PASS]")
        else:
            print(f"    - Feature Order: {cols} (Expected {expected_cols}) [FAIL]")
            status = False
            
        # Shape
        if X.shape == (expected_rows, 8) and len(y) == expected_rows:
            print(f"    - Dimensions: X={X.shape}, y={y.shape} [PASS]")
        else:
            print(f"    - Dimensions: X={X.shape}, y={y.shape} [FAIL]")
            status = False
            
        # Numeric, No NaN, No Inf
        is_numeric = all(pd.api.types.is_numeric_dtype(dt) for dt in X.dtypes)
        has_nan = X.isna().any().any()
        has_inf = np.isinf(X).any().any()
        
        if is_numeric and not has_nan and not has_inf:
            print(f"    - Data Integrity: Numeric, No NaN, No Inf [PASS]")
        else:
            print(f"    - Data Integrity: Numeric={is_numeric}, NaN={has_nan}, Inf={has_inf} [FAIL]")
            status = False
            
        # Labels 0 and 1
        valid_labels = y.isin([0, 1]).all()
        if valid_labels:
            print(f"    - Labels Integrity: Strictly 0 and 1 [PASS]")
        else:
            print(f"    - Labels Integrity: Invalid labels found [FAIL]")
            status = False
            
        return status
        
    t_pass = validate_matrices(X_train, y_train, "Training Set", 15000)
    v_pass = validate_matrices(X_val, y_val, "Validation Set", 5000)
    
    # Ensure column names are exactly identical
    cols_match = (list(X_train.columns) == list(X_val.columns))
    print(f"\n  Training and Validation columns identically matched: {'[PASS]' if cols_match else '[FAIL]'}")
    
    all_passed = t_pass and v_pass and cols_match
    
    # Feature statistics
    print_section("Feature Statistics: Benign vs. Tunnel (Training Set)")
    # Combine for stats
    combined = X_train.copy()
    combined['label'] = y_train
    
    mean_stats = combined.groupby('label').mean().round(4)
    print("  Mean values by class:")
    print("  " + "-" * 78)
    
    # Print formatted
    header = f"  {'Feature':<20} | {'Benign (0)':<15} | {'Tunnel (1)':<15}"
    print(header)
    print("  " + "-" * 78)
    for col in ["domain_length", "subdomain_length", "label_count", "digit_count", "digit_ratio", "special_char_count", "domain_entropy", "subdomain_entropy"]:
        b_val = mean_stats.loc[0, col]
        t_val = mean_stats.loc[1, col]
        print(f"  {col:<20} | {b_val:<15} | {t_val:<15}")
        
    print_banner("DAY 3 MATRIX VERDICT")
    if all_passed:
        print("  [SUCCESS] DAY 3 MATRIX CREATION PASSED!")
    else:
        print("  [FAIL] Errors in matrix creation.")
        
    return all_passed

if __name__ == "__main__":
    success = run_day3_pipeline()
    sys.exit(0 if success else 1)
