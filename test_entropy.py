"""
Entropy Test Script for DNS Tunneling Detection Project
-------------------------------------------------------
Day 3: Verify calculate_entropy() works correctly on known inputs.
Run with: .\\venv\\Scripts\\python.exe test_entropy.py
"""
import sys
import math
sys.path.insert(0, '.')
from src.entropy import calculate_entropy

def run_tests():
    print("=" * 54)
    print("  ENTROPY FUNCTION TEST CASES")
    print("=" * 54)

    # Format: (input, description, expected_value_or_None, check_type)
    # check_type: 'exact', 'approx', 'nonzero', 'any'
    test_cases = [
        (None,           "None input (edge case)",             0.0,   "exact"),
        ("",             "Empty string",                        0.0,   "exact"),
        ("a",            "Single character only",               0.0,   "exact"),
        ("aaaaaaa",      "All identical chars  (aaaaaaa)",      0.0,   "exact"),
        ("ab",           "Two distinct chars   (ab)",           1.0,   "approx"),
        ("abcdefgh",     "Eight unique chars   (abcdefgh)",     3.0,   "approx"),
        ("google",       "Benign domain word   (google)",       None,  "nonzero"),
        ("q+Z8AnwaBA",   "Tunneling payload    (q+Z8AnwaBA)",   None,  "nonzero"),
        ("a1b2c3d4e5",   "Alphanumeric mixed",                  None,  "nonzero"),
        ("aaabbbccc",    "Repeated groups      (aaabbbccc)",    None,  "any"),
    ]

    all_passed = True

    for i, (inp, desc, expected, check) in enumerate(test_cases, 1):
        result = calculate_entropy(inp)
        is_float  = isinstance(result, float)
        is_finite = math.isfinite(result)

        # Determine pass/fail
        if check == "exact":
            ok = is_float and is_finite and (result == expected)
        elif check == "approx":
            ok = is_float and is_finite and (abs(result - expected) < 1e-4)
        elif check == "nonzero":
            ok = is_float and is_finite and (result > 0.0)
        else:  # "any" – just must be finite float
            ok = is_float and is_finite

        status = "PASS" if ok else "FAIL"
        if not ok:
            all_passed = False

        exp_str = f"{expected}" if expected is not None else "(finite float)"
        print(f"  Test {i:>2}: {desc}")
        print(f"           Input    : {repr(inp)}")
        print(f"           Result   : {result}")
        print(f"           Expected : {exp_str}")
        print(f"           Status   : [{status}]")
        print()

    print("=" * 54)
    verdict = "ALL TESTS PASSED" if all_passed else "SOME TESTS FAILED"
    print(f"  OVERALL : [{verdict}]")
    print("=" * 54)
    return all_passed


if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
