"""
DNS Tunneling Detection - Day 1 Setup Verification Script
=========================================================
Academic Machine Learning Project: DNS Tunneling Detection
Phase: Day 1 - Environment & Project Initialization

This script validates that the Python environment, project directory structure,
dependencies, and source modules are correctly configured before development begins.
"""

import sys
import os
import importlib
from pathlib import Path


def print_header(title: str) -> None:
    print("\n" + "=" * 65)
    print(f"  {title}")
    print("=" * 65)


def check_python_environment() -> bool:
    print_header("1. Python Environment Check")
    version_info = sys.version_info
    version_str = f"{version_info.major}.{version_info.minor}.{version_info.micro}"
    executable_path = sys.executable
    in_venv = sys.prefix != sys.base_prefix

    print(f"  Python Version:     {version_str}")
    print(f"  Executable Path:    {executable_path}")
    print(f"  In Virtual Env:     {'[YES] (venv active)' if in_venv else '[NO] (system python)'}")

    is_compatible = (version_info.major == 3 and version_info.minor == 12)
    if is_compatible:
        print("  Status:             [PASS] Compatible Python 3.12 detected.")
    else:
        print(f"  Status:             [WARN] Expected Python 3.12, running {version_str}.")
    return is_compatible and in_venv


def check_required_packages() -> bool:
    print_header("2. Required Packages Check")
    packages_to_check = [
        ("pandas", "pandas"),
        ("numpy", "numpy"),
        ("scikit-learn", "sklearn"),
        ("shap", "shap"),
        ("matplotlib", "matplotlib"),
        ("seaborn", "seaborn"),
        ("joblib", "joblib"),
    ]

    all_passed = True
    for display_name, import_name in packages_to_check:
        try:
            module = importlib.import_module(import_name)
            ver = getattr(module, "__version__", "unknown")
            print(f"  - {display_name:<16} : [INSTALLED] (v{ver})")
        except ImportError as e:
            print(f"  - {display_name:<16} : [MISSING] ({e})")
            all_passed = False

    return all_passed


def check_project_structure(project_root: Path) -> bool:
    print_header("3. Project Directory Structure Check")
    expected_dirs = ["data", "src", "models", "results", "notebooks"]
    expected_files = [
        "requirements.txt",
        "README.md",
        ".gitignore",
        "main.py",
        "src/__init__.py",
        "src/data_loader.py",
        "src/preprocessing.py",
        "src/feature_extraction.py",
        "src/entropy.py",
        "src/train_models.py",
        "src/evaluate.py",
        "src/explainability.py",
    ]

    all_passed = True
    print("  Checking Directories:")
    for d in expected_dirs:
        dir_path = project_root / d
        if dir_path.is_dir():
            print(f"    [OK] {d}/")
        else:
            print(f"    [FAIL] {d}/ is missing!")
            all_passed = False

    print("\n  Checking Files:")
    for f in expected_files:
        file_path = project_root / f
        if file_path.is_file():
            print(f"    [OK] {f}")
        else:
            print(f"    [FAIL] {f} is missing!")
            all_passed = False

    return all_passed


def check_src_modules_syntax() -> bool:
    print_header("4. Source Modules Import & Syntax Check")
    modules_to_test = [
        "src.data_loader",
        "src.preprocessing",
        "src.feature_extraction",
        "src.entropy",
        "src.train_models",
        "src.evaluate",
        "src.explainability",
    ]

    all_passed = True
    for mod_name in modules_to_test:
        try:
            importlib.import_module(mod_name)
            print(f"    [OK] {mod_name:<26} (valid syntax)")
        except Exception as e:
            print(f"    [FAIL] {mod_name:<26} (Error: {e})")
            all_passed = False

    return all_passed


def check_datasets_status(project_root: Path) -> None:
    print_header("5. Dataset Readiness (Informational)")
    train_path = project_root / "data" / "training.csv"
    val_path = project_root / "data" / "validating.csv"

    if train_path.exists():
        size_mb = train_path.stat().st_size / (1024 * 1024)
        print(f"  - training.csv:    [FOUND] ({size_mb:.2f} MB)")
    else:
        print("  - training.csv:    [PENDING] (15,000 records headerless CSV to be placed in data/)")

    if val_path.exists():
        size_mb = val_path.stat().st_size / (1024 * 1024)
        print(f"  - validating.csv:  [FOUND] ({size_mb:.2f} MB)")
    else:
        print("  - validating.csv:  [PENDING] (5,000 records headerless CSV to be placed in data/)")


def main():
    print("\n=================================================================")
    print("      DNS TUNNELING DETECTION - DAY 1 SETUP VERIFICATION        ")
    print("=================================================================")

    project_root = Path(__file__).resolve().parent

    env_ok = check_python_environment()
    pkg_ok = check_required_packages()
    struct_ok = check_project_structure(project_root)
    src_ok = check_src_modules_syntax()
    check_datasets_status(project_root)

    print_header("Summary & Verification Verdict")
    if env_ok and pkg_ok and struct_ok and src_ok:
        print("  [SUCCESS] All Day 1 setup verification checks PASSED!")
        print("  The project environment and architecture are ready for Day 2.")
    else:
        print("  [WARNING] Some checks reported issues. Review details above.")
    print("=" * 65 + "\n")


if __name__ == "__main__":
    main()
