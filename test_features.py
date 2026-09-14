"""
Feature Extraction Test Script for DNS Tunneling Detection Project
------------------------------------------------------------------
Day 3: Verify extract_features() correctly returns exactly 8 features.
Run with: .\\venv\\Scripts\\python.exe test_features.py
"""
import sys
import math
sys.path.insert(0, '.')
from src.feature_extraction import extract_features

def run_tests():
    print("=" * 64)
    print("  FEATURE EXTRACTION FUNCTION TEST CASES")
    print("=" * 64)

    test_domains = [
        ("example.com", "Benign - No subdomain"),
        ("abc.example.com", "Benign - Single subdomain"),
        ("a.b.example.com", "Benign - Multi-part subdomain"),
        ("q+Z8AnwaBA.hidemyself.org", "Tunnel - Base64 payload"),
        ("1234567890.bad.com", "Tunnel - All digits"),
        ("", "Edge case - Empty string")
    ]

    all_passed = True
    expected_keys = {
        "domain_length", "subdomain_length", "label_count", 
        "digit_count", "digit_ratio", "special_char_count", 
        "domain_entropy", "subdomain_entropy"
    }

    for i, (domain, desc) in enumerate(test_domains, 1):
        print(f"Test {i}: {desc} -> '{domain}'")
        features = extract_features(domain)
        
        # Check exactly 8 keys
        keys = set(features.keys())
        has_exact_keys = (keys == expected_keys)
        
        # Check all numeric and finite
        is_numeric = all(isinstance(v, (int, float)) for v in features.values())
        is_finite = all(math.isfinite(v) for v in features.values())
        
        ok = has_exact_keys and is_numeric and is_finite
        status = "PASS" if ok else "FAIL"
        if not ok:
            all_passed = False
            
        print(f"  Features returned: {len(features)} (Expected: 8)")
        print(f"  Keys match exact spec: {has_exact_keys}")
        print(f"  All values numeric/finite: {is_numeric and is_finite}")
        print(f"  Values: {features}")
        print(f"  Status: [{status}]\n")

    print("=" * 64)
    verdict = "ALL TESTS PASSED" if all_passed else "SOME TESTS FAILED"
    print(f"  OVERALL : [{verdict}]")
    print("=" * 64)
    return all_passed

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
