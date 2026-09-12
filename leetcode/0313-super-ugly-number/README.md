# 313. Super Ugly Number

A **super ugly number** is a positive integer whose prime factors are all in a given array `primes`. Given `n` and `primes`, return the `n`th super ugly number. By convention, 1 is the first super ugly number, and `primes` is guaranteed to consist only of primes.

**Example 1:**
```
Input: n = 12, primes = [2,7,13,19]
Output: 32
Explanation: [1,2,4,7,8,13,14,16,19,26,28,32] is the sequence of the first 12 super ugly numbers.
```

**Example 2:**
```
Input: n = 1, primes = [2,3,5]
Output: 1
```

**Constraints:**
- 1 <= n <= 10^6
- 1 <= primes.length <= 100
- 2 <= primes[i] <= 1000
- primes are guaranteed to be prime and in strictly increasing order

## Approach

This is the exact same multi-pointer generation idea as "Ugly Number II," just generalized from a fixed 3 primes (2, 3, 5) to an arbitrary list of `k` primes. Every super ugly number after the first is some earlier super ugly number multiplied by one of the given primes, so build the sequence forward instead of testing candidates for ugliness.

Keep a growing list `ugly = [1]`, and one pointer per prime — `pointers[i]` tracks "which already-found ugly number should be multiplied by `primes[i]` to produce that prime's next unused candidate." At each step, compute all `k` candidates (`ugly[pointers[i]] * primes[i]` for each `i`), take the minimum as the next super ugly number, append it, and advance **every** pointer whose candidate equaled that minimum (not just one) — same reasoning as before: this is what prevents the same value from being appended twice when it's reachable via more than one prime (e.g. `14 = 2*7 = 7*2`).

Repeat until `n` numbers have been generated. With `k` primes, each step scans all `k` pointers to find the minimum, so this runs in O(n*k) — fine for the given constraints (n up to 10^6, k up to 100 gives ~10^8 basic operations, well within typical time limits). A min-heap of `(candidate, prime_index, pointer_index)` could shave this to O(n log k) if needed, but the direct scan is simpler and sufficient here.

**Time complexity:** O(n * k) — n numbers generated, each requiring an O(k) scan over all primes' pointers.

**Space complexity:** O(n + k) for the generated list and the pointer array.
