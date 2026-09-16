# 278. First Bad Version

**Commonly asked at:** Meta, Amazon

You're a product manager tracking down the commit that introduced a bug. You have `n` versions numbered `1` to `n`, and you're given an API `isBadVersion(version)` that tells you whether a given version is bad. Since a bad version causes all versions after it to be bad too, find the very first bad version, calling the API as few times as possible.

**Example 1:**
```
Input: n = 5, bad = 4
Output: 4
Explanation: isBadVersion(3) -> false, isBadVersion(4) -> true, isBadVersion(5) -> true
First bad version is 4.
```

**Example 2:**
```
Input: n = 1, bad = 1
Output: 1
```

**Constraints:**
- 1 <= bad <= n <= 2^31 - 1

## Approach

The brute-force way is to call `isBadVersion` on 1, 2, 3, ... in order until it first returns true. That's O(n) calls, and with n up to 2 billion that's completely impractical.

The key observation is that the versions split into a clean prefix of "good" followed by a suffix of "bad" — `isBadVersion` is a monotonic function once you order versions by number. Whenever a predicate over a sorted range flips from false to true exactly once, binary search finds the flip point in O(log n) calls instead of scanning.

Keep `lo = 1` and `hi = n`. At each step check the midpoint: if it's bad, the answer is at or before the midpoint, so pull `hi` down to `mid`; if it's good, the answer is strictly after the midpoint, so push `lo` up to `mid + 1`. Stop when `lo == hi` — that's the first bad version. Using `mid = lo + (hi - lo) // 2` avoids integer overflow that a naive `(lo + hi) // 2` could hit in languages with fixed-width ints.

**Time complexity:** O(log n) — each step halves the search space.

**Space complexity:** O(1) — just a couple of pointers.
