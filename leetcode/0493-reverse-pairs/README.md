# 493. Reverse Pairs

**Commonly asked at:** Google, Amazon

You're given an integer array `nums`. Return the number of "reverse pairs" — pairs of indices `(i, j)` where `i < j` and `nums[i] > 2 * nums[j]`.

**Example 1:**
```
Input: nums = [1,3,2,3,1]
Output: 2
Explanation: (1,4) -> nums[1]=3 > 2*nums[4]=2, and (3,4) -> nums[3]=3 > 2*nums[4]=2.
```

**Example 2:**
```
Input: nums = [2,4,3,5,1]
Output: 3
```

**Constraints:**
- 1 <= nums.length <= 5 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1

## Approach

This is the same merge-sort-counting technique as counting smaller-numbers-to-the-right, adapted to the `> 2x` condition instead of plain `>`. Brute force is O(n^2); merge sort brings it down to O(n log n) by counting cross-half qualifying pairs during the merge, while both halves are still individually sorted.

Recursively split `nums` in half and sort each half. Right before actually merging the two sorted halves together, run a separate counting pass over them: for each element `left[i]` (walking left to right), advance a pointer `j` through `right` as long as `left[i] > 2 * right[j]` — since `right` is sorted, once `left[i] > 2 * right[j]` holds for some `j`, it also holds for every smaller `right[0..j]`, so the count of valid partners for `left[i]` is just `j` at the point the `while` loop stops. Because `left[i]` is non-decreasing as `i` increases (the left half is sorted) and `right[j]` is non-decreasing, `j` never needs to reset or move backward across the whole pass — giving an O(len(left) + len(right)) two-pointer scan instead of a nested loop.

This counting has to happen *before* the actual merge step (which interleaves the two sorted halves into one) because the merge would destroy the clean separation between "originally from the left half" and "originally from the right half" that the pair condition (`i < j`, i.e. left-half index before right-half index) depends on. Once counting is done, the ordinary merge proceeds untouched, and doubles as what keeps recursion at O(n log n) overall.

**Time complexity:** O(n log n) — merge sort's usual O(log n) recursion depth, with O(n) work per level for both the counting pass and the merge itself.

**Space complexity:** O(n) for the temporary arrays created during merging (plus O(log n) recursion stack).
