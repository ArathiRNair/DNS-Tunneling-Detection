"""
Test Backend API
----------------
Verifies the FastAPI endpoints correctly route requests to the live
prediction pipeline and handle both valid and invalid domain inputs.
"""
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from fastapi.testclient import TestClient
from src.api import app

client = TestClient(app)

def test_api():
    print("=" * 70)
    print("  TEST: BACKEND API PIPELINE (Day 6.2)")
    print("=" * 70)

    passed = True

    # 1. Test Valid Benign Domain
    print("1. Testing valid benign domain...")
    resp1 = client.post("/predict", json={"domain": "google.com"})
    if resp1.status_code == 200:
        data = resp1.json()
        print(f"   [OK] Status: {data.get('status')} | Confidence: {data.get('confidence_tunnel')}")
        if data.get('status') != "Benign":
            print("   [FAIL] Expected Benign status.")
            passed = False
    else:
        print(f"   [FAIL] HTTP {resp1.status_code}: {resp1.text}")
        passed = False

    # 2. Test Valid Tunnel Domain
    print("2. Testing valid simulated tunnel domain...")
    resp2 = client.post("/predict", json={"domain": "1234567890abcdef1234567890abcdef.tunnel.hidemyself.org"})
    if resp2.status_code == 200:
        data = resp2.json()
        print(f"   [OK] Status: {data.get('status')} | Confidence: {data.get('confidence_tunnel')}")
        if data.get('status') != "Tunnel":
            print("   [FAIL] Expected Tunnel status.")
            passed = False
    else:
        print(f"   [FAIL] HTTP {resp2.status_code}: {resp2.text}")
        passed = False

    # 3. Test Invalid/Empty Domain
    print("3. Testing invalid/empty domain...")
    resp3 = client.post("/predict", json={"domain": "   "})
    if resp3.status_code == 400:
        print(f"   [OK] Correctly rejected with 400: {resp3.json().get('detail')}")
    else:
        print(f"   [FAIL] Expected 400 error, got {resp3.status_code}")
        passed = False

    # 4. Test Missing Field
    print("4. Testing malformed request (missing field)...")
    resp4 = client.post("/predict", json={"wrong_field": "google.com"})
    if resp4.status_code == 422:
        print(f"   [OK] Correctly rejected with 422 Validation Error")
    else:
        print(f"   [FAIL] Expected 422 error, got {resp4.status_code}")
        passed = False

    if passed:
        print("\n======================================================================")
        print("  [SUCCESS] Backend API pipeline test PASSED!")
        print("======================================================================")
        return True
    else:
        print("\n[FAIL] Backend API testing failed.")
        return False

if __name__ == "__main__":
    success = test_api()
    sys.exit(0 if success else 1)
