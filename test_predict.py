"""
Test Live Prediction Pipeline
-----------------------------
Ensures the live prediction module accurately processes, extracts, and
evaluates a handful of known domain strings through the trained model.
"""
import sys
from pathlib import Path
import json

PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from src.predict import predict_domain

def test_prediction():
    print("=" * 70)
    print("  TEST: LIVE DOMAIN PREDICTION PIPELINE")
    print("=" * 70)

    model_path = str(PROJECT_ROOT / "models" / "rf_model.joblib")
    
    test_domains = [
        # Normal Benign domains
        "google.com",
        "api.github.com.", # trailing dot to test cleaner
        
        # Simulated Malicious / Tunnel domains (long, high entropy)
        "dGVzdGluZ3RoaXNkbnN0dW5uZWxleGZpbHRyYXRpb24xMjM0NTY3ODk.badactor.net",
        "1234567890abcdef1234567890abcdef.tunnel.hidemyself.org"
    ]
    
    passed = True
    
    for domain in test_domains:
        try:
            print(f"Testing Domain: '{domain}'")
            result = predict_domain(domain, model_path=model_path)
            
            print(f"  Sanitized: {result['sanitized_domain']}")
            print(f"  Status:    {result['status']} (Conf: {result['confidence_tunnel']:.2f})")
            print(f"  Features:  [Length: {result['features']['domain_length']}, Entropy: {result['features']['domain_entropy']:.2f}]")
            print("-" * 50)
            
            # Simple assertions
            if not isinstance(result["prediction"], int):
                passed = False
                print("  [FAIL] Prediction is not an integer.")
            
            if "error" in result:
                passed = False
                print(f"  [FAIL] Unexpected error returned: {result['error']}")
                
        except Exception as e:
            passed = False
            print(f"  [FAIL] Exception raised: {str(e)}")

    if passed:
        print("\n======================================================================")
        print("  [SUCCESS] Live prediction pipeline test PASSED!")
        print("======================================================================")
        return True
    else:
        print("\n[FAIL] Pipeline testing failed.")
        return False

if __name__ == "__main__":
    success = test_prediction()
    sys.exit(0 if success else 1)
