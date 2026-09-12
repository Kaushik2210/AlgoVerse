# 80. Remove Duplicates from Sorted Array II

Given a sorted integer array `nums`, remove duplicates in place so that each unique value appears at most **twice**, keeping the relative order. Return `k`, the number of elements kept — the first `k` slots of `nums` should hold the result, the rest don't matter.

**Example 1:**
```
Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
```

**Example 2:**
```
Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
```

**Constraints:**
- 1 <= nums.length <= 3 * 10^4
- -10^4 <= nums[i] <= 10^4
- `nums` is sorted in non-decreasing order

## Approach

This is the classic two-pointer in-place trick, just with the "allow up to two copies" rule instead of "allow only one." A brute-force approach would shift elements left every time a third duplicate is found, which is O(n^2) in the worst case — the two-pointer version does it in one pass.

Keep a `write` index for where the next kept element goes, and let `read` scan through the whole array. The key test: `nums[read]` is safe to keep if `write` hasn't placed 2 elements yet, or if `nums[read]` differs from the value two slots behind `write` (`nums[write - 2]`). Since the array is sorted, comparing against `nums[write - 2]` is exactly asking "would this make three in a row?" — if the value two spots back in the *result so far* matches, keeping this one would be a third copy, so skip it. Otherwise write `nums[read]` into `nums[write]` and advance `write`.

Because the array is already sorted, all duplicates of any value are consecutive, so this single backward-looking comparison is enough to enforce the at-most-two rule without any extra counting.

**Time complexity:** O(n) — one pass with `read`, constant work per element.

**Space complexity:** O(1) — everything is done in place.
