# 276. Paint Fence

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway since it pairs naturally with Paint House as another small-fixed-state DP, but with a "no more than two in a row" twist instead of "no two adjacent the same."*

There's a fence with `n` posts, and `k` different colors of paint. Paint every post so that no more than two adjacent posts have the same color (three or more consecutive posts the same color is not allowed; two in a row is fine). Return the number of ways to paint the fence.

**Example 1:**
```
Input: n = 3, k = 2
Output: 6
Explanation: All valid colorings: aab, aba, abb, baa, bab, bba (using colors a, b).
```

**Example 2:**
```
Input: n = 1, k = 1
Output: 1
```

**Constraints:**
- 1 <= n <= 50
- 1 <= k <= 10^5

## Approach

Trying to track the exact color of each post explodes with `k` up to 10^5, so the state needs to avoid referencing specific colors. What actually matters for a valid coloring going forward is just: does the current post match the color of the post before it, or not? Split every valid coloring of the first `i` posts into two counts: `same[i]`, colorings where post `i` matches post `i-1`, and `diff[i]`, colorings where post `i` differs from post `i-1`.

If post `i` matches post `i-1` (contributing to `same[i]`), then post `i-1` must NOT have matched post `i-2` (otherwise three in a row), so this only extends colorings counted in `diff[i-1]`, and there's exactly 1 way to pick post `i`'s color once post `i-1`'s color is fixed: `same[i] = diff[i-1]`. If post `i` differs from post `i-1` (contributing to `diff[i]`), it can extend *any* valid coloring of the first `i-1` posts (whether or not `i-1` matched `i-2`), and there are `k-1` other color choices for post `i` given post `i-1`'s color: `diff[i] = (same[i-1] + diff[i-1]) * (k - 1)`.

Base case: for a single post, there's no previous post to compare against, so treat `same[1] = 0` and `diff[1] = k` (or equivalently seed with post 1's `k` choices and roll forward from post 2). The final answer is `same[n] + diff[n]`.

**Time complexity:** O(n) — one pass building up `same` and `diff` post by post.

**Space complexity:** O(1) — only the previous post's `same`/`diff` values are needed at each step.
