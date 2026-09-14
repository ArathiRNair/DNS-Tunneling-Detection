"""
Entropy Calculation Module
==========================
Academic Machine Learning Project: DNS Tunneling Detection
Phase: Day 3 - Feature Extraction & Shannon Entropy

Academic Background:
--------------------
Shannon Entropy measures the degree of randomness or unpredictability in a string of characters.
The formula is:

    H(X) = -SUM [ P(x_i) * log2(P(x_i)) ]

Where:
  - P(x_i) is the probability of character x_i appearing in the string.
  - log2 is the logarithm base 2.
  - The sum is taken over all unique characters.

Why Entropy Detects DNS Tunneling:
-----------------------------------
1. Benign / Regular Domains:
   - Human-readable and memorable (e.g., "google.com", "university.edu").
   - Characters follow natural language patterns (mostly vowels and common consonants).
   - Lower entropy: typically in the range of 2.5 to 3.5.

2. DNS Tunnel Domains:
   - Carry encoded binary payloads (Base32, Base64, Hexadecimal) inside the subdomain.
   - Characters are spread much more uniformly (all 64 Base64 characters used equally).
   - Higher entropy: often above 4.0, sometimes approaching 6.0.

This makes Shannon Entropy one of the most powerful signals for DNS tunneling detection.
"""

import math
from collections import Counter


def calculate_entropy(text: str) -> float:
    """
    Calculates the Shannon Entropy of a given string.

    Shannon Entropy quantifies how random or uniform the characters
    in a string are. Higher values = more random = more likely to be
    an encoded DNS tunneling payload.

    Formula:
        H = -SUM [ p(x) * log2(p(x)) ]

    Where p(x) = count of character x / total length of string.

    Parameters:
    -----------
    text : str
        Any string input (domain name, subdomain label, etc.)

    Returns:
    --------
    float
        The Shannon entropy value (always >= 0.0).
        Returns 0.0 for empty, None, or single-character strings.

    Behavior:
    ---------
    - None input         -> returns 0.0 safely.
    - Empty string ""    -> returns 0.0 safely.
    - Single character   -> returns 0.0 (no randomness possible).
    - Repeated chars     -> low entropy (e.g., "aaaaaaa" -> ~0.0).
    - Varied chars       -> higher entropy (e.g., "abcdefgh" -> ~3.0).

    Examples:
    ---------
    >>> calculate_entropy("")
    0.0
    >>> calculate_entropy("aaaaaaa")
    0.0
    >>> calculate_entropy("abcdefgh")
    3.0
    """
    # --- Step 1: Handle empty or None input safely ---
    if not text:
        return 0.0

    # --- Step 2: Convert to string (safety for unexpected input types) ---
    text = str(text)

    # --- Step 3: Handle single character (no randomness possible) ---
    if len(text) < 2:
        return 0.0

    # --- Step 4: Count frequency of each unique character ---
    # Counter returns a dictionary: { character: count }
    # Example: "aab" -> {'a': 2, 'b': 1}
    char_counts = Counter(text)
    total_chars = len(text)

    # --- Step 5: Calculate Shannon Entropy ---
    entropy = 0.0
    for count in char_counts.values():
        # Probability of this character appearing
        probability = count / total_chars

        # Shannon formula: -p * log2(p)
        entropy -= probability * math.log2(probability)

    return round(entropy, 6)  # Round to 6 decimal places for clean output
