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


from sklearn.ensemble import GradientBoostingClassifier

def train_gradient_boosting(X_train: pd.DataFrame, y_train: pd.Series, random_state: int = 42) -> GradientBoostingClassifier:
    """
    Trains a standard Gradient Boosting Classifier on the feature matrix.

    Unlike Random Forest, Gradient Boosting builds trees sequentially to
    correct residual errors of previous trees.

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
    GradientBoostingClassifier
        The trained scikit-learn Gradient Boosting model.
    """
    model = GradientBoostingClassifier(
        random_state=random_state,
        n_estimators=100
    )
    
    # Train the model
    model.fit(X_train, y_train)
    
    return model


from sklearn.ensemble import HistGradientBoostingClassifier

def train_hist_gradient_boosting(X_train: pd.DataFrame, y_train: pd.Series, random_state: int = 42) -> HistGradientBoostingClassifier:
    """
    Trains a Histogram-based Gradient Boosting Classifier.

    This estimator is much faster than GradientBoostingClassifier for big datasets,
    as it bins the data into integer-valued bins (histograms).

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
    HistGradientBoostingClassifier
        The trained scikit-learn HistGradientBoosting model.
    """
    model = HistGradientBoostingClassifier(
        random_state=random_state,
        max_iter=100
    )
    
    # Train the model
    model.fit(X_train, y_train)
    
    return model

import joblib
from pathlib import Path

def save_model(model, file_path: str):
    path = Path(file_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, path)

def load_model(file_path: str):
    return joblib.load(file_path)

