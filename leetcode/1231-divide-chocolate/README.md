# 1231. Divide Chocolate

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here because it's the "maximize the minimum" twin of Split Array Largest Sum / Magnetic Force Between Two Balls and rounds out that binary-search-on-the-answer family.*

You have a chocolate bar made of `n` chunks, `sweetness[i]` is the sweetness of the `i`-th chunk. You want to share it with `k` friends, so cut it into `k + 1` pieces using cuts along chunk boundaries — each piece is a contiguous range of chunks. You'll eat the piece with the minimum total sweetness (after giving away the other `k`). Find the maximum total sweetness you can guarantee for your own piece.

**Example 1:**
```
Input: sweetness = [1,2,3,4,5,6,7,8,9], k = 5
Output: 6
Explanation: Cut into [1,2,3],[4,5],[6],[7],[8],[9], giving 6 pieces with sums 6,9,6,7,8,9. The minimum is 6, which is the best achievable.
```

**Example 2:**
```
Input: sweetness = [5,6,7,8,9,1,2,3,4], k = 8
Output: 1
Explanation: With 8 friends there must be 9 pieces total from 9 chunks, so every piece is a single chunk. The minimum chunk value is 1.
```

**Constraints:**
- 0 <= k < sweetness.length <= 10^4
- 1 <= sweetness[i] <= 10^5

## Approach

Same "maximize the minimum" binary search as Magnetic Force Between Two Balls, applied to contiguous sums instead of point spacing.

For a candidate minimum sweetness `s`, check feasibility greedily: walk the chunks left to right, accumulating a running sum; whenever that running sum reaches `s`, cut there — that's one piece done, reset the accumulator to 0. Count how many pieces this greedy cutting produces; `s` is feasible if it yields at least `k + 1` pieces, since cutting as soon as possible (rather than waiting) never produces fewer pieces than any other valid cutting achieving minimum sweetness `s` — greedy is optimal here for the same reason as in the ball-spacing problem: being eager only leaves more chunks for the remaining pieces.

Feasibility is monotonic: a smaller `s` is easier to reach (more pieces fit), a larger `s` is harder. We want the *largest* feasible `s`. The lower bound is `min(sweetness)` (a single chunk can always be its own piece) and the upper bound is `sum(sweetness) // (k + 1)` (you obviously can't average above the total split evenly). Binary search that range with the round-up mid, pushing `lo` up when feasible and pulling `hi` down otherwise, to land on the maximum feasible minimum.

**Time complexity:** O(n log(sum(sweetness) / (k+1))) — each binary search step is an O(n) greedy scan.

**Space complexity:** O(1) extra space.
