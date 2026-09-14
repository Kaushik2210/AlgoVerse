# 374. Guess Number Higher or Lower

You're playing a guessing game against a picked number in `[1, n]`. You call `int guess(int num)`, a pre-defined API, which returns:
- `-1` if your guess is higher than the picked number
- `1` if your guess is lower than the picked number
- `0` if your guess is correct

Return the number that was picked, using as few calls to `guess` as possible.

**Example 1:**
```
Input: n = 10, pick = 6
Output: 6
```

**Example 2:**
```
Input: n = 1, pick = 1
Output: 1
```

**Example 3:**
```
Input: n = 2, pick = 1
Output: 1
```

**Constraints:**
- 1 <= n <= 2^31 - 1
- 1 <= pick <= n

## Approach

Guessing numbers one at a time from 1 upward would work but takes up to `n` calls — way more than needed. The `guess` API is really just a three-way comparator against a value hidden in a sorted, contiguous range `[1, n]`, which is exactly what binary search is built for.

Maintain a search window `[lo, hi]`, starting at `[1, n]`. Each round, guess the midpoint. If `guess` says "correct," return it. If it says "your guess is higher," the picked number is below the midpoint, so shrink the window to the lower half; if "lower," shrink to the upper half. Repeat until found.

The only subtlety is the same overflow trap as any binary search on the upper bound of a 32-bit range: compute `mid` as `lo + (hi - lo) / 2` rather than `(lo + hi) / 2`, since `lo + hi` can overflow when `n` is near `2^31 - 1`.

Verified with a stub `guess` function against picks of 6 (n=10), 1 (n=1), the boundary case pick=n=2147483647, and picks sitting at both ends of the range (1 and 10 for n=10) — all resolved to the correct picked number.

**Time complexity:** O(log n) — binary search halves the window each call.

**Space complexity:** O(1).
