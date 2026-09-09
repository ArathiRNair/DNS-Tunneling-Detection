"""
Feature Extraction Module
=========================
Future Purpose:
---------------
This module will transform raw domain strings into quantitative numerical features
that machine learning algorithms can analyze to detect DNS tunneling patterns.

Why Features are Needed for DNS Tunneling:
------------------------------------------
Attackers encode exfiltrated data (via Base32, Base64, or Hexadecimal) into the labels
of DNS query names. As a result, tunneled domains exhibit distinct structural traits:
- Unusually long domain and subdomain lengths.
- Higher proportions of numerical digits and consonants.
- Greater number of subdomains/labels separated by dots.

Planned Features to Engineer:
-----------------------------
1. Lexical Length Features:
   - Total domain string length.
   - Longest subdomain / label length.
   - Subdomain count (number of labels separated by dots).
2. Character Distribution Features:
   - Numerical digit count and digit ratio (digits / total length).
   - Vowel count and vowel ratio.
   - Consonant count and consonant ratio.
   - Special character count (hyphens, underscores).
3. Linguistic & Structural Features:
   - Consonant-to-vowel ratio (tunneled strings have skewed ratios).
   - Top-Level Domain (TLD) length.

Planned Functions (Future Implementation):
------------------------------------------
- extract_domain_features(domain: str) -> dict:
    Extracts all lexical and structural metrics for a single domain name.
- build_feature_dataset(df) -> tuple:
    Extracts feature matrix X and target labels y for model training.
"""

# Placeholder: Functionality will be implemented in subsequent project phases.
