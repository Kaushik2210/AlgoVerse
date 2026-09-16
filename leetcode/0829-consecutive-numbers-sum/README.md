# 829. Consecutive Numbers Sum

**Commonly asked at:** Google

Given a positive integer `n`, return the number of ways it can be written as the sum of one or more **consecutive positive** integers.

**Example 1:**
```
Input: n = 5
Output: 2
Explanation: 5 = 5 = 2 + 3.
```

**Example 2:**
```
Input: n = 9
Output: 3
Explanation: 9 = 9 = 4 + 5 = 2 + 3 + 4.
```

**Example 3:**
```
Input: n = 15
Output: 4
Explanation: 15 = 15 = 7 + 8 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5.
```

**Constraints:**
- 1 <= n <= 10^9

## Approach

Suppose `n` is written as the sum of `k` consecutive positive integers starting at some positive integer `x`:

```
n = x + (x+1) + (x+2) + ... + (x+k-1) = k*x + k*(k-1)/2
```

Solving for `x`:

```
x = (n - k*(k-1)/2) / k
```

For a given `k`, this is a valid way to write `n` exactly when `x` comes out to be a **positive integer** — meaning `n - k*(k-1)/2` must be positive (so a valid starting value exists) and evenly divisible by `k` (so `x` is an integer, not a fraction).

So the whole problem reduces to counting how many values of `k = 1, 2, 3, ...` satisfy both conditions. Since `k*(k-1)/2` grows quadratically, it exceeds `n` fairly quickly (`k` only needs to go up to roughly `sqrt(2n)`), so just iterate `k` upward from 1, computing the remainder `n - k*(k-1)/2` at each step, and stop as soon as that remainder becomes non-positive — since past that point, no larger `k` can work either (the required "positive `x`" condition fails, and it only gets worse for even bigger `k`). For each `k` still in range, check divisibility by `k` and count it if it divides evenly.

**Time complexity:** O(sqrt(n)) — the loop runs roughly `sqrt(2n)` times before `k*(k-1)/2` exceeds `n`.

**Space complexity:** O(1).
