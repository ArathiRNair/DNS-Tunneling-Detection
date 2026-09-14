"""
Feature Extraction Module
=========================
Academic Machine Learning Project: DNS Tunneling Detection
Phase: Day 3 - Feature Extraction & Shannon Entropy

This module transforms raw domain strings into a standard set of numerical
features (exactly 8 features) designed to distinguish between benign domains
and DNS tunneling domains.
"""

from src.entropy import calculate_entropy


def extract_features(domain: str) -> dict:
    """
    Extracts exactly 8 numerical features from a domain string.

    The features are:
    1. domain_length
    2. subdomain_length
    3. label_count
    4. digit_count
    5. digit_ratio
    6. special_char_count
    7. domain_entropy
    8. subdomain_entropy

    Parameters:
    -----------
    domain : str
        A sanitized domain name (e.g., "abc.example.com").

    Returns:
    --------
    dict
        A dictionary containing the 8 calculated numerical features.
    """
    # Safely handle empty or null input
    if not domain:
        return {
            "domain_length": 0,
            "subdomain_length": 0,
            "label_count": 0,
            "digit_count": 0,
            "digit_ratio": 0.0,
            "special_char_count": 0,
            "domain_entropy": 0.0,
            "subdomain_entropy": 0.0
        }

    # --- 1. domain_length ---
    domain_length = len(domain)

    # Pre-computation: Split domain into labels (dot-separated)
    parts = domain.split(".")

    # --- 3. label_count ---
    label_count = len(parts)

    # --- Subdomain isolation ---
    # We assume the last two labels form the base domain (e.g., "example.com" or "hidemyself.org").
    # Everything before the last two labels is considered the subdomain.
    if label_count > 2:
        # Example: "abc.def.example.com" -> parts[:-2] is ["abc", "def"]
        subdomain_parts = parts[:-2]
        # Join without dots as per requirement to not count separating dots
        subdomain_str = "".join(subdomain_parts)
    else:
        # Example: "example.com" -> no subdomain
        subdomain_str = ""

    # --- 2. subdomain_length ---
    subdomain_length = len(subdomain_str)

    # --- 4. digit_count ---
    digit_count = sum(1 for char in domain if char.isdigit())

    # --- 5. digit_ratio ---
    # Avoid division by zero, though domain_length > 0 is guaranteed here
    digit_ratio = digit_count / domain_length if domain_length > 0 else 0.0

    # --- 6. special_char_count ---
    # Count characters that are not alphanumeric and not a dot '.'
    special_char_count = sum(1 for char in domain if not char.isalnum() and char != '.')

    # --- 7. domain_entropy ---
    domain_entropy = calculate_entropy(domain)

    # --- 8. subdomain_entropy ---
    subdomain_entropy = calculate_entropy(subdomain_str)

    # Return the exact 8 features in a consistent dictionary
    return {
        "domain_length": domain_length,
        "subdomain_length": subdomain_length,
        "label_count": label_count,
        "digit_count": digit_count,
        "digit_ratio": round(digit_ratio, 6),
        "special_char_count": special_char_count,
        "domain_entropy": domain_entropy,
        "subdomain_entropy": subdomain_entropy
    }


import pandas as pd

def build_feature_dataset(df: pd.DataFrame) -> tuple[pd.DataFrame, pd.Series]:
    """
    Extracts feature matrix X and target labels y for model training.

    Parameters:
    -----------
    df : pd.DataFrame
        DataFrame containing 'domain' and 'label' columns.

    Returns:
    --------
    X : pd.DataFrame
        Feature matrix (Nx8).
    y : pd.Series
        Target labels (Nx1).
    """
    # Fast approach: apply extract_features and convert to list of dicts
    features_list = df['domain'].apply(extract_features).tolist()
    
    # Create DataFrame
    X = pd.DataFrame(features_list)
    
    # Ensure exact column order
    expected_cols = [
        "domain_length",
        "subdomain_length",
        "label_count",
        "digit_count",
        "digit_ratio",
        "special_char_count",
        "domain_entropy",
        "subdomain_entropy"
    ]
    X = X[expected_cols]
    
    y = df['label']
    
    return X, y
