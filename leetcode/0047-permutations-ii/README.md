# 47. Permutations II

Given a collection of numbers `nums` that might contain duplicates, return all possible unique permutations in any order.

**Example 1:**
```
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**Example 2:**
```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Constraints:**
- 1 <= nums.length <= 8
- -10 <= nums[i] <= 10

## Approach

This is Permutations (46) with duplicate input values, which on its own would produce duplicate permutations if handled naively (e.g. swapping which of two equal `1`s goes first produces two "different" paths that look identical in the output). The backtracking skeleton is the same "used" array + build-path-position-by-position approach, but with a rule added to prevent picking equal values redundantly at the same decision point.

Sort the array first so equal values sit next to each other. Then, at each recursive call, when choosing what to place next, skip a candidate if it's equal to the previous element in the array AND that previous element hasn't been used yet at this point in the recursion. The "hasn't been used yet" condition is the key subtlety: it enforces that among a run of equal values, they only ever get placed in left-to-right order relative to each other within a single permutation — so the recursion only explores one canonical way to interleave a group of duplicates, and never both.

**Time complexity:** O(n! * n) in the worst case (bounded by the number of permutations of distinct elements, less when duplicates prune branches) — each of the up to n! permutations takes O(n) to copy into the result.

**Space complexity:** O(n) for the recursion depth, the path, and the used array, on top of the O(n! * n) space for the output itself.
