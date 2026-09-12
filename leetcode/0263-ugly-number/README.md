# 263. Ugly Number

An ugly number is a positive integer whose only prime factors are 2, 3, and 5. Given an integer `n`, return `true` if `n` is an ugly number.

**Example 1:**
```
Input: n = 6
Output: true
Explanation: 6 = 2 * 3
```

**Example 2:**
```
Input: n = 1
Output: true
Explanation: 1 has no prime factors, which trivially satisfies the condition
```

**Example 3:**
```
Input: n = 14
Output: false
Explanation: 14 = 2 * 7, and 7 is not 2, 3, or 5
```

**Constraints:**
- -2^31 <= n <= 2^31 - 1

## Approach

Instead of factoring `n` into primes and checking which ones show up, it's simpler to repeatedly strip away the allowed factors and see what's left over. Divide `n` by 2 as many times as it divides evenly, then by 3 as many times as it divides evenly, then by 5 the same way. Every division removes one instance of that prime factor from `n`.

After stripping out every possible factor of 2, 3, and 5, whatever remains is made up entirely of other prime factors (if `n` had any). So `n` is ugly if and only if this process ends at exactly 1 — meaning nothing but 2s, 3s, and 5s were ever in it.

Non-positive numbers need to be handled first: 0 can never be reached by multiplying primes together, and negative numbers aren't considered ugly either, so both are immediately `false`.

**Time complexity:** O(log n) — each division shrinks n geometrically.

**Space complexity:** O(1).
