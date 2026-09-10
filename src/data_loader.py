"""
Data Loader Module
==================
Academic Machine Learning Project: DNS Tunneling Detection
Phase: Day 2 - Data Ingestion & Ingestion Validation

This module handles loading headerless CSV datasets into standardized pandas DataFrames.
It performs strict structure and binary-label validation with beginner-friendly error messages.

Dataset Specifications:
-----------------------
- training.csv:   15,000 records
- validating.csv:  5,000 records
- Format: Headerless CSV (no column headers in raw files)
- Column Mapping:
    * Column 0: Binary Ground-Truth Label (0 = Benign Domain, 1 = DNS Tunnel)
    * Column 1: Domain Name String (e.g., "example.com", "payload.tunnel.org.")
"""

import os
from pathlib import Path
from typing import Tuple
import pandas as pd


# Standard column names assigned during headerless CSV ingestion
EXPECTED_COLUMNS = ["label", "domain"]
VALID_LABELS = {0, 1}


def load_dataset(file_path: str | Path) -> pd.DataFrame:
    """
    Loads a headerless CSV dataset, assigns standard column names,
    and performs data integrity validations.

    Parameters:
    -----------
    file_path : str | Path
        Path to the headerless CSV file (e.g., 'data/training.csv').

    Returns:
    --------
    pd.DataFrame
        A DataFrame with exactly two columns: ['label', 'domain'].

    Raises:
    -------
    FileNotFoundError:
        If the specified file does not exist.
    ValueError:
        If the CSV structure is invalid, empty, or labels are non-binary.
    """
    path_obj = Path(file_path).resolve()

    # 1. Validate File Existence
    if not path_obj.exists():
        raise FileNotFoundError(
            f"[Error] Dataset file not found at: '{path_obj}'.\n"
            f"Please ensure 'training.csv' and 'validating.csv' are placed in the 'data/' folder."
        )

    # 2. Validate Non-Empty File
    if path_obj.stat().st_size == 0:
        raise ValueError(f"[Error] Dataset file '{path_obj.name}' is empty (0 bytes).")

    # 3. Read Headerless CSV
    try:
        df = pd.read_csv(
            path_obj,
            header=None,
            names=EXPECTED_COLUMNS,
            dtype={"label": "int64", "domain": "string"},
            skip_blank_lines=True,
        )
    except Exception as e:
        raise ValueError(f"[Error] Failed to parse CSV '{path_obj.name}': {e}")

    # 4. Validate Exactly Two Columns
    if list(df.columns) != EXPECTED_COLUMNS:
        raise ValueError(
            f"[Error] Unexpected column structure in '{path_obj.name}'. "
            f"Expected {EXPECTED_COLUMNS}, but found {list(df.columns)}."
        )

    # 5. Validate Binary Ground-Truth Labels (0 and 1 only)
    unique_labels = set(df["label"].dropna().unique())
    if not unique_labels.issubset(VALID_LABELS):
        invalid_labels = unique_labels - VALID_LABELS
        raise ValueError(
            f"[Error] Invalid label values found in '{path_obj.name}': {invalid_labels}. "
            f"Labels must strictly be binary: 0 (Benign) or 1 (DNS Tunnel)."
        )

    # 6. Report Ingestion Summary
    record_count = len(df)
    print(f"  [Loader] Successfully loaded '{path_obj.name}': {record_count:,} records.")

    return df


def load_all_datasets(data_dir: str | Path = "data") -> Tuple[pd.DataFrame, pd.DataFrame]:
    """
    Loads both training.csv and validating.csv from the specified data directory.

    Parameters:
    -----------
    data_dir : str | Path
        Directory where datasets reside (defaults to 'data').

    Returns:
    --------
    Tuple[pd.DataFrame, pd.DataFrame]
        Tuple of (train_df, val_df).
    """
    base_path = Path(data_dir)
    train_path = base_path / "training.csv"
    val_path = base_path / "validating.csv"

    print("\n--- Ingesting Raw Datasets ---")
    train_df = load_dataset(train_path)
    val_df = load_dataset(val_path)

    return train_df, val_df
