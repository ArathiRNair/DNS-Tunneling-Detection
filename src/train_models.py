"""
Model Training Module
=====================
Academic Machine Learning Project: DNS Tunneling Detection
Phase: Day 4 - Model Training (Random Forest)

This module handles the initialization and training of machine learning
models using the extracted numerical features.
"""

from sklearn.ensemble import RandomForestClassifier
import pandas as pd

def train_random_forest(X_train: pd.DataFrame, y_train: pd.Series, random_state: int = 42) -> RandomForestClassifier:
    """
    Trains a Random Forest Classifier on the provided feature matrix and labels.

    Uses `class_weight='balanced'` to account for the 80/20 class imbalance
    between DNS Tunneling domains and Benign domains in our dataset.

    Parameters:
    -----------
    X_train : pd.DataFrame
        The training feature matrix (should contain exactly 8 features).
    y_train : pd.Series
        The training labels (0 = Benign, 1 = Tunnel).
    random_state : int, optional
        Seed for reproducibility (default is 42).

    Returns:
    --------
    RandomForestClassifier
        The trained scikit-learn Random Forest model.
    """
    # Initialize the Random Forest model
    # - random_state ensures reproducible academic results
    # - class_weight="balanced" automatically adjusts weights inversely proportional
    #   to class frequencies in the input data.
    model = RandomForestClassifier(
        random_state=random_state,
        class_weight="balanced",
        n_estimators=100  # Default number of trees
    )
    
    # Train the model on the data
    model.fit(X_train, y_train)
    
    return model
