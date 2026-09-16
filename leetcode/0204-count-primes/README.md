# 204. Count Primes

**Commonly asked at:** Amazon

Given an integer `n`, return the number of prime numbers that are strictly less than `n`.

**Example 1:**
```
Input: n = 10
Output: 4
Explanation: 2, 3, 5, 7 are the primes less than 10.
```

**Example 2:**
```
Input: n = 0
Output: 0
```

**Constraints:**
- 0 <= n <= 5 * 10^6

## Approach

Checking each number below `n` for primality on its own (trial division up to its square root) works but is wasteful — it re-derives the same divisibility facts over and over for different numbers.

The Sieve of Eratosthenes flips the direction of the work: instead of asking "is this number prime?" one at a time, start by assuming everything is prime, then walk each prime you find and cross off every multiple of it as composite. Starting each sweep at `i * i` (rather than `2 * i`) is a small but real optimization — any smaller multiple of `i` was already crossed off by a smaller prime factor. Once `i * i >= n` there's nothing left to sieve, since any composite below `n` must have a factor at or below its square root.

At the end, whatever is still marked prime in the sieve, is prime — just count it.

Verified against `n = 10` -> 4, `n = 0` -> 0, `n = 1` -> 0 (no primes below 1), `n = 2` -> 0 (no primes below 2), and `n = 100` -> 25 (the well-known count of primes below 100).

**Time complexity:** O(n log log n) — the classic sieve bound, since each prime's multiples are visited a shrinking number of times.

**Space complexity:** O(n) for the boolean sieve array.
