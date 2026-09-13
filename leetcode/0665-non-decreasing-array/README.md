# 665. Non-decreasing Array

Given an array of integers, determine if it can become non-decreasing (each element `>=` the previous one) by modifying **at most one** element.

**Example 1:**
```
Input: nums = [4,2,3]
Output: true
Explanation: lower the first element from 4 to 1 (or anything <= 2) to get [1,2,3].
```

**Example 2:**
```
Input: nums = [4,2,1]
Output: false
Explanation: fixing the 4-2 dip isn't enough, the 2-1 dip also needs a change — that's two modifications.
```

**Constraints:**
- 1 <= nums.length <= 10^4
- -10^5 <= nums[i] <= 10^5

## Approach

Scan the array once looking for "dips" — positions where `nums[i-1] > nums[i]`. If there's more than one dip, no single edit can fix both (each edit only directly affects the ordering at its own position and its immediate neighbors), so the answer is false.

The subtlety is in how to fix a dip once found. There are two options: lower `nums[i-1]` down to `nums[i]`, or raise `nums[i]` up to `nums[i-1]`. Naively always lowering the earlier value can break the relationship with whatever came before it (if `nums[i-2] > nums[i]`, lowering `nums[i-1]` to `nums[i]` would create a *new* dip between `i-2` and `i-1`). So check: if there's no element two back, or `nums[i-2] <= nums[i]`, it's safe to lower `nums[i-1]` to `nums[i]` (this is the generally preferable choice since it keeps values as small as possible, leaving more room for whatever comes next). Otherwise, lowering would break the earlier pair, so raise `nums[i]` up to `nums[i-1]` instead — this can't break anything earlier since it doesn't touch `nums[i-1]` or anything before it.

Because only one modification is ever allowed, the moment a second dip is found after the first fix, the answer is immediately false — there's no need to try alternate fixes or backtrack.

**Time complexity:** O(n) — a single pass, with O(1) work at each dip.

**Space complexity:** O(1) — the array is modified in place, no extra structures.
