"""
Model Explainability Module (SHAP)
==================================
Academic Machine Learning Project: DNS Tunneling Detection
Phase: SHAP Interpretability

Provides model interpretability using SHAP (SHapley Additive exPlanations)
to uncover why a machine learning model classified a specific domain
as benign or tunneled.
"""

import shap
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path

def compute_shap_values(model, X_sample: pd.DataFrame):
    """
    Initializes a TreeExplainer and computes SHAP values for the given data.

    Parameters:
    -----------
    model : Tree-based classifier (e.g., RandomForestClassifier)
        The trained scikit-learn model.
    X_sample : pd.DataFrame
        The feature matrix to explain.

    Returns:
    --------
    explainer : shap.TreeExplainer
        The fitted SHAP TreeExplainer.
    shap_values_obj : shap.Explanation or numpy array
        The computed SHAP values object.
    """
    # Initialize the TreeExplainer.
    # Note: For classification, shap_values might be a list of arrays (one per class).
    explainer = shap.TreeExplainer(model)
    
    # Compute SHAP values
    shap_values = explainer(X_sample)
    
    return explainer, shap_values

def plot_shap_summary_bar(shap_values, X_sample: pd.DataFrame, output_dir: Path):
    """
    Saves a global feature importance explanation bar plot to `results/`.
    """
    plt.figure()
    
    # In newer SHAP versions (>= 0.40), explainer(X) returns a shap.Explanation object.
    # We must handle binary classification where shap_values might have a shape (N, features, 2)
    # The positive class is typically at index 1.
    
    if len(shap_values.shape) == 3:
        # Extract values for the positive class (class 1: Tunnel)
        sv = shap_values[:, :, 1]
    elif isinstance(shap_values, list) and len(shap_values) == 2:
        sv = shap_values[1]
    else:
        sv = shap_values

    # Generate the bar plot
    shap.summary_plot(sv, features=X_sample, plot_type="bar", show=False)
    
    file_path = output_dir / "shap_feature_importance_bar.png"
    plt.savefig(file_path, bbox_inches='tight', dpi=300)
    plt.close()

def plot_shap_summary_beeswarm(shap_values, X_sample: pd.DataFrame, output_dir: Path):
    """
    Saves a global feature importance explanation beeswarm plot to `results/`.
    """
    plt.figure()
    
    if len(shap_values.shape) == 3:
        sv = shap_values[:, :, 1]
    elif isinstance(shap_values, list) and len(shap_values) == 2:
        sv = shap_values[1]
    else:
        sv = shap_values
        
    # Generate the beeswarm plot
    shap.summary_plot(sv, features=X_sample, show=False)
    
    file_path = output_dir / "shap_beeswarm.png"
    plt.savefig(file_path, bbox_inches='tight', dpi=300)
    plt.close()

def get_global_feature_importance(shap_values, X_sample: pd.DataFrame) -> pd.DataFrame:
    """
    Calculates the mean absolute SHAP value for each feature, representing
    its overall global importance to the model.

    Returns:
    --------
    pd.DataFrame
        DataFrame of features and their Mean Absolute SHAP values, sorted descending.
    """
    if len(shap_values.shape) == 3:
        sv = shap_values[:, :, 1].values
    elif isinstance(shap_values, list) and len(shap_values) == 2:
        sv = shap_values[1]
    else:
        sv = shap_values.values if hasattr(shap_values, "values") else shap_values

    # Calculate mean absolute SHAP values across all samples
    mean_abs_shap = np.abs(sv).mean(axis=0)
    
    importance_df = pd.DataFrame({
        'Feature': X_sample.columns,
        'Mean_Absolute_SHAP': mean_abs_shap
    })
    
    # Sort by highest importance
    importance_df = importance_df.sort_values(by='Mean_Absolute_SHAP', ascending=False).reset_index(drop=True)
    return importance_df
