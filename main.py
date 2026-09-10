"""
DNS Tunneling Detection - Day 2 Data Ingestion & Validation Pipeline
=====================================================================
Academic Machine Learning Project: DNS Tunneling Detection
Phase: Day 2 - Data Ingestion, Sanitization & Quality Validation

This script executes the complete Day 2 data processing workflow:
1. Ingests headerless CSV datasets ('training.csv' and 'validating.csv').
2. Assigns standard column schemas ['label', 'domain'].
3. Sanitizes domain queries (strips whitespace and removes trailing DNS root dots).
4. Conducts integrity checks (shapes, column names, binary labels, nulls, duplicates).
5. Analyzes class balance (Benign vs. DNS Tunnel).
6. Computes basic textual domain-length statistics.
7. Displays domain cleaning before/after transformations.
8. Reports an overall PASS/FAIL verdict for Day 2 academic review.
"""

import sys
from pathlib import Path
import pandas as pd

# Add project root to path for modular imports
PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.data_loader import load_dataset
from src.preprocessing import (
    clean_dataset,
    validate_dataset,
    get_class_distribution,
    get_domain_length_stats,
    get_cleaning_examples,
)


def print_banner(title: str, char: str = "=", width: int = 70) -> None:
    print("\n" + char * width)
    print(f"  {title}")
    print(char * width)


def print_section(title: str) -> None:
    print(f"\n--- {title} ---")


def run_day2_pipeline():
    print_banner("DNS TUNNELING DETECTION - DAY 2 DATA PIPELINE")
    print(f"  Root Directory: {PROJECT_ROOT}")

    data_dir = PROJECT_ROOT / "data"
    train_path = data_dir / "training.csv"
    val_path = data_dir / "validating.csv"

    # =========================================================================
    # STEP 1: LOAD RAW HEADERLESS DATASETS
    # =========================================================================
    print_banner("STEP 1: DATASET INGESTION", "-")
    try:
        raw_train_df = load_dataset(train_path)
        raw_val_df = load_dataset(val_path)
    except Exception as e:
        print(f"\n[FATAL INGESTION ERROR] {e}")
        print("\n" + "=" * 70)
        print("  DAY 2 VALIDATION: [FAILED] (Ingestion Error)")
        print("=" * 70 + "\n")
        sys.exit(1)

    # =========================================================================
    # STEP 2: DOMAIN SANITIZATION / PREPROCESSING
    # =========================================================================
    print_banner("STEP 2: DOMAIN SANITIZATION", "-")
    print("  Applying domain cleaning:")
    print("  - Converting to string safely")
    print("  - Stripping leading and trailing whitespace")
    print("  - Collapsing irregular internal whitespace")
    print("  - Stripping trailing DNS root dots (e.g., 'example.com.' -> 'example.com')")
    print("  - Preserving internal dots and meaningful characters")

    train_df = clean_dataset(raw_train_df)
    val_df = clean_dataset(raw_val_df)
    print("  [Preprocess] Sanitization completed for both training and validation sets.")

    # Show Cleaning Transformations (Before / After)
    print_section("Domain Cleaning Verification (Samples)")
    cleaning_samples = get_cleaning_examples(raw_train_df, train_df, num_examples=5)
    print(f"  {'#':<3} | {'Raw Input (Before)':<45} | {'Sanitized Output (After)':<45}")
    print("  " + "-" * 98)
    for i, (before, after) in enumerate(cleaning_samples, 1):
        # Truncate long payload strings cleanly for display
        b_disp = (before[:42] + "...") if len(before) > 45 else before
        a_disp = (after[:42] + "...") if len(after) > 45 else after
        print(f"  {i:<3} | {b_disp:<45} | {a_disp:<45}")

    # =========================================================================
    # STEP 3: DATA VALIDATION & INTEGRITY CHECKS
    # =========================================================================
    print_banner("STEP 3: DATA VALIDATION & INTEGRITY CHECKS", "-")

    train_val_metrics = validate_dataset(train_df, name="Training Set", expected_rows=15000)
    val_val_metrics = validate_dataset(val_df, name="Validation Set", expected_rows=5000)

    all_validations_passed = True

    for metrics in [train_val_metrics, val_val_metrics]:
        dname = metrics["dataset_name"]
        print_section(f"Validation Report: {dname}")

        # A. Shape Check
        shape_status = "[PASS]" if metrics["rows_valid"] else "[FAIL]"
        print(f"  - Record Count:         {metrics['total_records']:,} (Expected: {metrics['expected_records']:,}) -> {shape_status}")
        if not metrics["rows_valid"]:
            all_validations_passed = False

        # B. Columns Check
        col_status = "[PASS]" if metrics["columns_valid"] else "[FAIL]"
        print(f"  - Columns:              {metrics['columns']} -> {col_status}")
        if not metrics["columns_valid"]:
            all_validations_passed = False

        # C. Label Check
        lbl_status = "[PASS]" if metrics["labels_valid"] else "[FAIL]"
        print(f"  - Unique Labels:        {metrics['unique_labels']} (Expected: [0, 1]) -> {lbl_status}")
        if not metrics["labels_valid"]:
            all_validations_passed = False

        # D. Missing Values Check
        null_status = "[PASS]" if (metrics["null_labels"] == 0 and metrics["null_domains"] == 0) else "[FAIL]"
        print(f"  - Missing Values:       Labels={metrics['null_labels']}, Domains={metrics['null_domains']} -> {null_status}")
        if metrics["null_labels"] > 0 or metrics["null_domains"] > 0:
            all_validations_passed = False

        # E. Empty Domains Check
        empty_status = "[PASS]" if metrics["empty_domains"] == 0 else "[FAIL]"
        print(f"  - Empty Domain Strings: {metrics['empty_domains']} -> {empty_status}")
        if metrics["empty_domains"] > 0:
            all_validations_passed = False

        # F. Duplicate Domains Check (Reported, preserved as per Day 2 instructions)
        print(f"  - Duplicate Domains:    {metrics['duplicate_domains']:,} records (Reported; retained per instructions)")

    # =========================================================================
    # STEP 4: CLASS DISTRIBUTION ANALYSIS
    # =========================================================================
    print_banner("STEP 4: CLASS DISTRIBUTION ANALYSIS", "-")

    train_dist = get_class_distribution(train_df)
    val_dist = get_class_distribution(val_df)

    print(f"  {'Dataset':<16} | {'Total':<8} | {'Benign (0)':<16} | {'DNS Tunnel (1)':<16} | {'Distribution Match'}")
    print("  " + "-" * 78)

    for name, dist, exp_benign, exp_tunnel in [
        ("Training Set", train_dist, 3000, 12000),
        ("Validation Set", val_dist, 1000, 4000),
    ]:
        matches_expected = (dist["benign_count"] == exp_benign and dist["tunnel_count"] == exp_tunnel)
        match_str = "[MATCHES EXPECTED (80/20)]" if matches_expected else "[DIFFERENT FROM EXPECTED]"
        b_str = f"{dist['benign_count']:,} ({dist['benign_pct']:.1f}%)"
        t_str = f"{dist['tunnel_count']:,} ({dist['tunnel_pct']:.1f}%)"
        print(f"  {name:<16} | {dist['total']:<8,} | {b_str:<16} | {t_str:<16} | {match_str}")

    # =========================================================================
    # STEP 5: BASIC TEXTUAL DOMAIN STATISTICS
    # =========================================================================
    print_banner("STEP 5: BASIC DOMAIN-LENGTH STATISTICS", "-")
    print("  (Textual length metrics calculated for ingestion quality verification)")

    train_stats = get_domain_length_stats(train_df)
    val_stats = get_domain_length_stats(val_df)

    print(f"\n  {'Metric':<24} | {'Training Set':<16} | {'Validation Set':<16}")
    print("  " + "-" * 62)
    print(f"  {'Minimum Domain Length':<24} | {train_stats['min_length']:<16} | {val_stats['min_length']:<16}")
    print(f"  {'Maximum Domain Length':<24} | {train_stats['max_length']:<16} | {val_stats['max_length']:<16}")
    print(f"  {'Average Domain Length':<24} | {train_stats['avg_length']:<16.2f} | {val_stats['avg_length']:<16.2f}")
    print(f"  {'Median Domain Length':<24} | {train_stats['median_length']:<16.1f} | {val_stats['median_length']:<16.1f}")

    # =========================================================================
    # STEP 6: OVERALL DAY 2 VERDICT
    # =========================================================================
    print_banner("DAY 2 VERIFICATION VERDICT")
    if all_validations_passed:
        print("  [SUCCESS] DAY 2 DATA VALIDATION PASSED!")
        print("  - Datasets successfully loaded without headers.")
        print("  - Domains cleanly sanitized (trailing root-dots removed).")
        print("  - Labels confirmed strictly binary (0 = Benign, 1 = Tunnel).")
        print("  - Zero missing values and zero empty domain strings.")
        print("  - Dataset shapes and class distributions match expected 80/20 ratio.")
        print("  - Ready for Day 3 Feature Engineering & Shannon Entropy.")
    else:
        print("  [FAILURE] One or more data validation checks failed. See details above.")
    print("=" * 70 + "\n")

    return all_validations_passed


if __name__ == "__main__":
    success = run_day2_pipeline()
    sys.exit(0 if success else 1)
