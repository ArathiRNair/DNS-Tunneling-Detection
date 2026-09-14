"""
Model Evaluation Module
=======================
Academic Machine Learning Project: DNS Tunneling Detection
Phase: Formal Model Evaluation

Evaluates trained detection models using standard security/ML metrics.
"""

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
import os
from pathlib import Path

def calculate_metrics(y_true, y_pred) -> dict:
    """
    Computes key performance metrics for binary classification.

    Parameters:
    -----------
    y_true : array-like
        Ground truth labels (0 = Benign, 1 = Tunnel).
    y_pred : array-like
        Predicted labels.

    Returns:
    --------
    dict
        Contains Accuracy, Precision, Recall, F1, and the Confusion Matrix.
    """
    metrics = {
        "Accuracy": accuracy_score(y_true, y_pred),
        "Precision": precision_score(y_true, y_pred, zero_division=0),
        "Recall": recall_score(y_true, y_pred, zero_division=0),
        "F1": f1_score(y_true, y_pred, zero_division=0),
        "Confusion_Matrix": confusion_matrix(y_true, y_pred)
    }
    return metrics

def plot_confusion_matrix(cm, model_name: str, output_dir: Path):
    """
    Renders and saves a labeled heatmap of the confusion matrix.
    """
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", 
                xticklabels=["Benign (0)", "Tunnel (1)"], 
                yticklabels=["Benign (0)", "Tunnel (1)"])
    plt.title(f"{model_name} Confusion Matrix")
    plt.xlabel("Predicted Label")
    plt.ylabel("True Label")
    plt.tight_layout()
    
    file_path = output_dir / f"{model_name.replace(' ', '_').lower()}_cm.png"
    plt.savefig(file_path)
    plt.close()

def generate_evaluation_report(models_dict: dict, X_val, y_val, output_dir: str) -> pd.DataFrame:
    """
    Generates a full validation summary across multiple models.

    Parameters:
    -----------
    models_dict : dict
        Dictionary of { "Model Name": trained_model_object }
    X_val : pd.DataFrame
        Validation features.
    y_val : pd.Series
        Validation labels.
    output_dir : str
        Directory to save results.

    Returns:
    --------
    pd.DataFrame
        Comparison table of all models.
    """
    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)
    
    results = []
    
    for name, model in models_dict.items():
        # Generate predictions
        y_pred = model.predict(X_val)
        
        # Calculate metrics
        m = calculate_metrics(y_val, y_pred)
        
        # Plot and save CM
        plot_confusion_matrix(m["Confusion_Matrix"], name, out_path)
        
        # Store for comparison table
        results.append({
            "Model": name,
            "Accuracy": m["Accuracy"],
            "Precision": m["Precision"],
            "Recall": m["Recall"],
            "F1-Score": m["F1"],
            "CM_TN": m["Confusion_Matrix"][0][0],
            "CM_FP": m["Confusion_Matrix"][0][1],
            "CM_FN": m["Confusion_Matrix"][1][0],
            "CM_TP": m["Confusion_Matrix"][1][1]
        })
        
    df_results = pd.DataFrame(results)
    
    # Save comparison to CSV
    df_results.to_csv(out_path / "model_comparison.csv", index=False)
    
    return df_results
