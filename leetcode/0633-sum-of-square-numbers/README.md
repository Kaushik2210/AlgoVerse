# 633. Sum of Square Numbers

**Commonly asked at:** Facebook

Given a non-negative integer `c`, determine whether there exist two integers `a` and `b` such that `a^2 + b^2 = c`.

**Example 1:**
```
Input: c = 5
Output: true
Explanation: 1 * 1 + 2 * 2 = 5
```

**Example 2:**
```
Input: c = 3
Output: false
```

**Constraints:**
- 0 <= c <= 2^31 - 1

## Approach

Trying every pair `(a, b)` with nested loops is O(c) pairs at worst — wasteful, since the two squares aren't independent once `c` is fixed.

Instead, use two pointers moving toward each other: start `a` at 0 and `b` at `sqrt(c)` (the largest value `b` could possibly take, since `b^2` alone can't exceed `c`). At each step look at `a^2 + b^2`:
- if it equals `c`, found the pair
- if it's less than `c`, the sum needs to grow, so increase `a` (increasing `b` further isn't possible, it's already maxed for the current `a`)
- if it's more than `c`, the sum needs to shrink, so decrease `b`

This is monotonic in both directions (increasing `a` only grows the sum, decreasing `b` only shrinks it), so the two pointers never have to backtrack, and they meet after at most `sqrt(c)` steps. The only subtlety is computing the initial `b` precisely — floating-point `sqrt` can be off by one for large perfect squares, so it's worth using an exact integer square root.

Verified against `c = 5` -> true (1+4), `c = 3` -> false, `c = 0` -> true (0+0), `c = 1` -> true (0+1), `c = 2` -> true (1+1), and a large prime-like value `c = 998244353` -> true.

**Time complexity:** O(sqrt(c)) — the two pointers cover a range of size sqrt(c) between them.

**Space complexity:** O(1).
