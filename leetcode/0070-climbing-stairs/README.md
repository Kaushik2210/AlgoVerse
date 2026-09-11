# 70. Climbing Stairs

You're climbing a staircase with `n` steps. Each move you can climb either 1 or 2 steps. How many distinct ways are there to reach the top?

**Example 1:**
```
Input: n = 2
Output: 2
Explanation: 1 step + 1 step, or 2 steps
```

**Example 2:**
```
Input: n = 3
Output: 3
Explanation: 1+1+1, 1+2, or 2+1
```

**Constraints:**
- 1 <= n <= 45

## Approach

You could try to brute-force this by recursively exploring every combination of 1s and 2s that sum to `n` — but that recursion branches twice at every step with no memory of what's already been computed, so it blows up to exponential time very fast, recomputing the same subproblems over and over.

The trick is to notice a simple recurrence: to reach step `n`, your very last move was either a single step from step `n-1`, or a double step from step `n-2`. There's no other way to land exactly on step `n`. So the number of ways to reach step `n` is just the number of ways to reach step `n-1` plus the number of ways to reach step `n-2` — `ways(n) = ways(n-1) + ways(n-2)`. That's literally the Fibonacci recurrence in disguise, once you see it.

Rather than recomputing this recursively (which has the same repeated-work problem as brute force unless you memoize it), just build it up iteratively from the bottom: `ways(1) = 1`, `ways(2) = 2`, and then walk forward, keeping only the last two values, adding them together to get the next one — no need to store the whole history.

**Time complexity:** O(n) — one pass building up from the base cases to n.

**Space complexity:** O(1) — only the last two values need to be kept around at any time.
