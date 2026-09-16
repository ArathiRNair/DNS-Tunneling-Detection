"""
Live Domain Prediction Pipeline
===============================
Provides a clean inference function for live, single-domain predictions
using the trained Random Forest model.
"""

import pandas as pd
from pathlib import Path

from src.preprocessing import clean_domain
from src.feature_extraction import extract_features
from src.train_models import load_model

def predict_domain(domain: str, model_path: str = "models/rf_model.joblib") -> dict:
    """
    Evaluates a single raw domain string and predicts whether it is benign or a DNS tunnel.

    Parameters:
    -----------
    domain : str
        The raw domain query string to inspect.
    model_path : str
        Path to the saved Random Forest joblib model.

    Returns:
    --------
    dict
        Prediction results including the sanitized domain, prediction, confidence,
        and extracted features.
    """
    # 1. Sanitize using existing deterministic cleaner
    sanitized_domain = clean_domain(domain)
    
    # Fast failure for totally empty domains
    if not sanitized_domain:
        return {
            "original_domain": domain,
            "error": "Domain is empty after sanitization."
        }
        
    # 2. Extract exactly 8 features
    features_dict = extract_features(sanitized_domain)
    
    # Enforce exact column order as during training
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
    
    # 3. Create DataFrame matrix for sklearn
    X_pred = pd.DataFrame([features_dict])[expected_cols]
    
    # 4. Load the trained Random Forest Model
    model = load_model(model_path)
    
    # 5. Execute inference
    prediction = int(model.predict(X_pred)[0])
    
    # Get probability/confidence if supported
    probabilities = model.predict_proba(X_pred)[0]
    confidence_tunnel = float(probabilities[1])
    
    # 6. Format result
    status = "Tunnel" if prediction == 1 else "Benign"
    
    return {
        "original_domain": domain,
        "sanitized_domain": sanitized_domain,
        "prediction": prediction,
        "status": status,
        "confidence_tunnel": round(confidence_tunnel, 4),
        "features": features_dict
    }
