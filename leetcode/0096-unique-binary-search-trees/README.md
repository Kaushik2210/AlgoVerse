# 96. Unique Binary Search Trees

Given an integer `n`, return the number of structurally unique binary search trees that store values `1` through `n`.

**Example 1:**
```
Input: n = 3
Output: 5
```

**Example 2:**
```
Input: n = 1
Output: 1
```

**Constraints:**
- 1 <= n <= 19

## Approach

Start by thinking about what happens if you pick some value `k` to be the root. Everything smaller than `k` has to end up in the left subtree, and everything bigger has to end up in the right subtree — that's the BST property. So if `k` is the root, the left subtree is built from `k - 1` values and the right subtree from `n - k` values, and the number of distinct trees you can build for that choice of root is just (ways to arrange the left) times (ways to arrange the right), since the two subtrees are picked completely independently of each other.

Crucially, the actual values used don't matter, only how many of them there are — the count of unique BST shapes for any `k` consecutive integers only depends on `k`. That means this reduces to a clean 1D recurrence: let `dp[i]` be the number of unique BSTs you can build from `i` distinct values. Then for `dp[n]`, try every possible root position `i` from `0` to `n - 1` (meaning `i` values go left, `n - 1 - i` go right) and sum up `dp[i] * dp[n - 1 - i]` over all of them. `dp[0] = 1` as the base case (an empty tree is one "shape").

Brute-forcing this by actually building trees and counting is exponential and wasteful; the dp table computes it bottom-up in one pass, reusing smaller subproblems instead of recomputing them. This is the Catalan number recurrence in disguise.

**Time complexity:** O(n^2) — for each of the n table entries, the inner loop tries up to n root positions.

**Space complexity:** O(n) — one dp array of size n + 1.
