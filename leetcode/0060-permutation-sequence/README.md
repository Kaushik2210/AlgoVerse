# 60. Permutation Sequence

The set `[1, 2, ..., n]` has `n!` unique permutations. Listing them in lexicographically increasing order, return the `k`th permutation sequence (1-indexed).

**Example 1:**
```
Input: n = 3, k = 3
Output: "213"
```

**Example 2:**
```
Input: n = 4, k = 9
Output: "2314"
```

**Example 3:**
```
Input: n = 3, k = 1
Output: "123"
```

**Constraints:**
- 1 <= n <= 9
- 1 <= k <= n!

## Approach

Generating all `n!` permutations and indexing into the `k`th one would work for small `n` but is wasteful — there's a direct way to compute the digits one at a time using factorial number system logic, without ever generating a permutation that isn't the answer.

Think of it this way: fixing the first digit splits the remaining `(n-1)!` permutations into `n` equal-sized blocks, one per choice of first digit (in increasing order of the digits still available). So `(k-1) // (n-1)!` (0-indexed) tells you exactly which available digit goes first. Remove that digit from the pool, reduce `k` to `(k-1) % (n-1)! + 1` (the rank within the chosen block), and repeat with `n-1` remaining digits and `(n-1)!` block size, and so on down to 1 digit left.

Keep the pool of unused digits in a list; at each step, pick out and remove the digit at the computed index, append it to the result, and shrink the factorial denominator by one factor. Working with 0-indexed `k` throughout (subtract 1 at the very start) keeps the block-index arithmetic clean.

**Time complexity:** O(n^2) — n steps, and removing an element from a list (or array) at an arbitrary index costs O(n).

**Space complexity:** O(n) for the pool of remaining digits and the output.
