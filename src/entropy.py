"""
Entropy Calculation Module
==========================
Future Purpose:
---------------
This module calculates information entropy (specifically Shannon Entropy) for domain
names to detect high-randomness payloads characteristic of DNS tunneling.

Academic Background:
--------------------
Shannon Entropy measures the degree of uncertainty or randomness in a sequence of characters:
    H(X) = - SUM [ P(x_i) * log2(P(x_i)) ]

Why Entropy Detects DNS Tunneling:
----------------------------------
1. Benign Domains:
   - Created by humans to be readable and memorable (e.g., "university.edu", "shopping.com").
   - Exhibit natural language letter frequencies, resulting in lower entropy scores (typically 2.5 - 3.5).
2. Tunneled Domains:
   - Carry encoded binary/exfiltrated payloads (Base32, Base64, Hexadecimal).
   - Characters are distributed much more uniformly, yielding significantly higher entropy scores (often > 4.0).

Planned Functions (Future Implementation):
------------------------------------------
- calculate_shannon_entropy(text: str) -> float:
    Computes Shannon entropy for a given domain string or subdomain label.
- calculate_subdomain_entropy(domain: str) -> float:
    Focuses specifically on the entropy of the leftmost query payload.
"""

# Placeholder: Functionality will be implemented in subsequent project phases.
