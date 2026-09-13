# 280. Wiggle Sort

*Note: this is a LeetCode premium (subscriber-only) problem, so it can't be verified against the live judge, but it's implemented and tested against the interface described in the official problem statement below.*

Given an unsorted array `nums`, reorder it in place so that `nums[0] <= nums[1] >= nums[2] <= nums[3] >= nums[4] ...` (alternating "valley, peak, valley, peak"). Multiple valid answers may exist; any one is accepted.

**Example 1:**
```
Input: nums = [3,5,2,1,6,4]
Output: [3,5,1,6,2,4] (one valid wiggle ordering; others are also accepted)
```

**Example 2:**
```
Input: nums = [6,6,5,6,3,8]
Output: [6,6,5,6,3,8] (already satisfies the wiggle property)
```

## Approach

Fully sorting the array first (O(n log n)) and then interleaving values from the two halves works but does more work than necessary — the wiggle property doesn't require global order, only that each adjacent pair alternates the right way, so it can be achieved with a single linear pass.

Walk through the array comparing each element to its neighbor and fixing violations on the spot: at an even index `i` (0-indexed), the required relation is `nums[i] <= nums[i+1]`; at an odd index, it's `nums[i] >= nums[i+1]`. Whenever the actual relation is backwards, swap `nums[i]` and `nums[i+1]` — that swap only ever affects the pair currently being examined and the next comparison, and it can be shown that fixing violations locally, left to right, never breaks a relation that was already correctly satisfied earlier, because each swap only involves values adjacent to the current boundary.

So the algorithm is simply: for each `i` from `0` to `n - 2`, check whether the expected relation (`<=` for even `i`, `>=` for odd `i`) holds between `nums[i]` and `nums[i+1]`; if not, swap them. One pass, in place, no sorting needed.

**Time complexity:** O(n) — a single linear pass with constant work per element.

**Space complexity:** O(1) — swaps happen in place.
