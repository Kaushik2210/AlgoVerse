# 15. 3Sum

Given an integer array `nums`, find all unique triplets `[nums[i], nums[j], nums[k]]` (distinct indices) that add up to zero. The result shouldn't contain duplicate triplets.

**Example 1:**
```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```

**Example 2:**
```
Input: nums = [0,1,1]
Output: []
```

**Example 3:**
```
Input: nums = [0,0,0]
Output: [[0,0,0]]
```

**Constraints:**
- 3 <= nums.length <= 3000
- -10^5 <= nums[i] <= 10^5

## Approach

The naive approach tries every triple of indices — three nested loops, O(n^3) — and then you'd still need some way to dedupe identical triplets, which gets messy fast.

A much better approach: sort the array first, then fix one number at a time and turn the remaining problem into a two-pointer search for a pair that sums to the negation of the fixed number (this is really just "3Sum" built on top of "2Sum" logic, but using sorted-array two pointers instead of a hash map, because sorting also helps with dedup).

Walk through the sorted array with an index `i` for the first number. For each `i`, use two pointers — `left` starting right after `i`, `right` at the end of the array — and slide them toward each other: if the three-way sum is too small, move `left` up; if too big, move `right` down; if it's exactly zero, record the triplet and then advance both pointers past any duplicate values so the same triplet isn't recorded twice. Also skip over duplicate values for `i` itself between iterations, for the same reason. Sorting is also what makes the "too small / too big" comparisons meaningful in the first place — the two-pointer trick only works because the subarray is ordered.

**Time complexity:** O(n^2) — sorting costs O(n log n), then for each of the n choices of `i`, the two-pointer scan is O(n), and n^2 dominates.

**Space complexity:** O(log n) to O(n) for the sort itself (depends on the language's sort implementation); output space aside, no extra data structures are needed for the search.
