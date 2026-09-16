# 526. Beautiful Arrangement

**Commonly asked at:** Amazon, Google, Microsoft, Bloomberg

Suppose you have `n` integers labeled 1 to `n`. A permutation of these integers, `perm`, is called a beautiful arrangement if for every position `i` (1-indexed), either `perm[i]` is divisible by `i`, or `i` is divisible by `perm[i]`. Given `n`, return the number of beautiful arrangements you can construct.

**Example 1:**
```
Input: n = 2
Output: 2
Explanation: [1,2] works (1%1==0, 2%2==0). [2,1] works (2%1==0, 1 divides... 1%1==0). Both are beautiful.
```

**Example 2:**
```
Input: n = 1
Output: 1
```

**Constraints:**
- 1 <= n <= 15

## Approach

With `n` up to 15, brute-force generating all `n!` permutations and checking each one is way too slow (15! is over a trillion). The key improvement is to **backtrack while filling positions left to right, pruning as soon as a placement is invalid**, instead of building a full permutation before checking anything.

Fill positions 1, 2, ..., n one at a time. At position `pos`, try every unused number `num` from 1 to n; if `num % pos == 0 or pos % num == 0`, place it (mark it used), recurse to fill `pos + 1`, then backtrack (unmark it) to try the next candidate. Because the divisibility check happens *before* recursing deeper, an invalid branch is abandoned immediately rather than after wastefully filling out the rest of the permutation — this cuts the search space down enormously in practice, since later positions have progressively fewer valid numbers to try (a prime like 13 can only ever go in position 1 or 13, for instance). When `pos` exceeds `n`, every position has been successfully filled, so this is one complete beautiful arrangement — increment the count.

**Time complexity:** Bounded above by O(n!) in the absolute worst case, but the divisibility pruning makes the actual explored search tree far smaller in practice — well within range for n <= 15.

**Space complexity:** O(n) for the recursion depth and the `used` array.
