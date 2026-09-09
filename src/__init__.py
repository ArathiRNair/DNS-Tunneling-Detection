"""
DNS Tunneling Detection - Core Source Package
=============================================
This package contains modular components for the machine learning pipeline
designed to detect malicious DNS tunneling activities from domain queries.

Pipeline Modules:
-----------------
1. data_loader        - Loads headerless training and validation datasets.
2. preprocessing      - Cleans, standardizes, and validates domain strings.
3. feature_extraction - Extracts lexical and statistical domain properties.
4. entropy            - Calculates Shannon entropy to detect encoded payloads.
5. train_models       - Trains classification models (Random Forest, etc.).
6. evaluate           - Computes classification metrics and confusion matrix.
7. explainability     - Uses SHAP values to explain model predictions.
"""

__version__ = "0.1.0"
__author__ = "Academic Project"
