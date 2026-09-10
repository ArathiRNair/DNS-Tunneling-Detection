"""
Data Preprocessing & Validation Module
======================================
Academic Machine Learning Project: DNS Tunneling Detection
Phase: Day 2 - Domain Sanitization & Data Quality Validation

This module handles domain name cleaning (stripping whitespace, removing trailing root dots)
and performs data validation checks (shapes, labels, nulls, duplicates, and class distributions).

Why Root-Dot Removal Matters:
------------------------------
In the DNS specification (RFC 1034/1035), a trailing dot (e.g., "example.com.") explicitly
represents the DNS root zone. While valid in raw network captures, standard machine learning
feature extraction algorithms expect standardized domain strings without the trailing delimiter.
"""

from typing import Dict, Any, List, Tuple
import pandas as pd


def clean_domain(domain: Any) -> str:
    """
    Sanitizes an individual domain string deterministically.

    Steps:
    1. Safely convert input to string.
    2. Strip leading and trailing whitespace.
    3. Collapse irregular or repeated internal whitespace.
    4. Remove trailing DNS root-dot delimiter (e.g., 'google.com.' -> 'google.com').

    Note:
    - Internal dots separating domain labels are strictly preserved.
    - No meaningful characters are removed.

    Parameters:
    -----------
    domain : Any
        Raw domain name value from dataset.

    Returns:
    --------
    str
        Sanitized domain string.

    Examples:
    ---------
    >>> clean_domain("  google.com.  ")
    'google.com'
    >>> clean_domain(" abc123.example.com. ")
    'abc123.example.com'
    """
    if domain is None or pd.isna(domain):
        return ""

    # 1. Convert safely to string
    domain_str = str(domain)

    # 2. Strip leading and trailing whitespace
    domain_str = domain_str.strip()

    # 3. Collapse any irregular/repeated whitespace
    domain_str = " ".join(domain_str.split())

    # 4. Remove trailing DNS root dot delimiter (do NOT remove internal dots)
    domain_str = domain_str.rstrip(".")

    return domain_str


def clean_dataset(df: pd.DataFrame) -> pd.DataFrame:
    """
    Applies domain sanitization to the 'domain' column while keeping labels unchanged.

    Parameters:
    -----------
    df : pd.DataFrame
        Raw DataFrame containing ['label', 'domain'].

    Returns:
    --------
    pd.DataFrame
        New DataFrame with sanitized domains and identical column structure.
    """
    cleaned_df = df.copy()
    cleaned_df["domain"] = cleaned_df["domain"].apply(clean_domain)
    return cleaned_df


def validate_dataset(df: pd.DataFrame, name: str = "Dataset", expected_rows: int | None = None) -> Dict[str, Any]:
    """
    Performs comprehensive Day 2 validation checks on a dataset:
    - Shape check (row count and column count)
    - Column name validation
    - Binary label validation (0 and 1 only)
    - Missing value detection (labels and domains)
    - Empty domain string check
    - Duplicate domain check

    Parameters:
    -----------
    df : pd.DataFrame
        The DataFrame to validate.
    name : str
        Display name (e.g., 'Training' or 'Validation').
    expected_rows : int | None
        Expected number of rows (e.g., 15000 for train, 5000 for val).

    Returns:
    --------
    Dict[str, Any]
        Dictionary of validation metrics and overall pass/fail boolean.
    """
    total_rows = len(df)
    cols = list(df.columns)

    # Check Columns
    cols_valid = (cols == ["label", "domain"])

    # Check Expected Rows
    rows_valid = (total_rows == expected_rows) if expected_rows is not None else True

    # Check Labels
    unique_labels = set(df["label"].dropna().unique())
    labels_valid = unique_labels.issubset({0, 1}) and len(unique_labels) > 0

    # Missing Values
    null_labels = int(df["label"].isnull().sum())
    null_domains = int(df["domain"].isnull().sum())
    no_nulls = (null_labels == 0 and null_domains == 0)

    # Empty Domains
    empty_domains = int((df["domain"].str.len() == 0).sum())
    no_empty = (empty_domains == 0)

    # Duplicates
    duplicate_domains = int(df["domain"].duplicated().sum())

    passed = cols_valid and rows_valid and labels_valid and no_nulls and no_empty

    return {
        "dataset_name": name,
        "total_records": total_rows,
        "expected_records": expected_rows,
        "columns": cols,
        "columns_valid": cols_valid,
        "rows_valid": rows_valid,
        "unique_labels": sorted([int(x) for x in unique_labels]),
        "labels_valid": labels_valid,
        "null_labels": null_labels,
        "null_domains": null_domains,
        "empty_domains": empty_domains,
        "duplicate_domains": duplicate_domains,
        "validation_passed": passed,
    }


def get_class_distribution(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Computes class distribution metrics (counts and percentages) for binary labels.

    Parameters:
    -----------
    df : pd.DataFrame
        DataFrame with 'label' column.

    Returns:
    --------
    Dict[str, Any]
        Counts and percentages of Benign (0) and DNS Tunnel (1) records.
    """
    counts = df["label"].value_counts().to_dict()
    benign_count = counts.get(0, 0)
    tunnel_count = counts.get(1, 0)
    total = len(df)

    benign_pct = (benign_count / total * 100) if total > 0 else 0.0
    tunnel_pct = (tunnel_count / total * 100) if total > 0 else 0.0

    return {
        "total": total,
        "benign_count": benign_count,
        "tunnel_count": tunnel_count,
        "benign_pct": benign_pct,
        "tunnel_pct": tunnel_pct,
    }


def get_domain_length_stats(df: pd.DataFrame) -> Dict[str, float]:
    """
    Calculates basic textual length statistics for domain quality inspection.

    Parameters:
    -----------
    df : pd.DataFrame
        DataFrame with sanitized 'domain' column.

    Returns:
    --------
    Dict[str, float]
        Dictionary with min, max, average (mean), and median domain lengths.
    """
    lengths = df["domain"].str.len()
    return {
        "min_length": int(lengths.min()),
        "max_length": int(lengths.max()),
        "avg_length": float(lengths.mean()),
        "median_length": float(lengths.median()),
    }


def get_cleaning_examples(raw_df: pd.DataFrame, cleaned_df: pd.DataFrame, num_examples: int = 5) -> List[Tuple[str, str]]:
    """
    Extracts samples comparing raw domain values with their cleaned counterparts.

    Parameters:
    -----------
    raw_df : pd.DataFrame
        Raw ingested DataFrame.
    cleaned_df : pd.DataFrame
        Sanitized DataFrame.
    num_examples : int
        Number of examples to return.

    Returns:
    --------
    List[Tuple[str, str]]
        List of (before, after) tuples.
    """
    changed_mask = raw_df["domain"] != cleaned_df["domain"]
    changed_indices = raw_df[changed_mask].index[:num_examples]

    examples = []
    for idx in changed_indices:
        examples.append((raw_df.loc[idx, "domain"], cleaned_df.loc[idx, "domain"]))

    # Fallback to first few rows if none were modified
    if not examples:
        for idx in range(min(num_examples, len(raw_df))):
            examples.append((raw_df.loc[idx, "domain"], cleaned_df.loc[idx, "domain"]))

    return examples
