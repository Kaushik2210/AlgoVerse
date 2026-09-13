# 912. Sort an Array

Given an array of integers `nums`, sort it in ascending order. This one is literally "implement a sorting algorithm," so the point is to build an O(n log n) comparison sort from scratch rather than call a language built-in.

**Example 1:**
```
Input: nums = [5,2,3,1]
Output: [1,2,3,5]
```

**Example 2:**
```
Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
```

**Constraints:**
- 1 <= nums.length <= 5 * 10^4
- -5 * 10^4 <= nums[i] <= 5 * 10^4

## Approach

Simple quadratic sorts (insertion sort, selection sort, bubble sort) are O(n^2) and won't pass at n = 5*10^4. Two classic O(n log n) approaches are implemented here to show both ends of the divide-and-conquer sorting spectrum.

**Merge sort** splits the array in half recursively until each piece is a single element (trivially sorted), then merges pairs of already-sorted halves back together: walk two pointers, one into each half, always taking the smaller of the two current elements and advancing that pointer, until one half is exhausted, then append the rest of the other half. Because merging two sorted runs of total length k takes O(k), and there are O(log n) levels of splitting, the whole thing is O(n log n) — and it's stable and has a *worst-case* guarantee of O(n log n), since the split point is always the midpoint regardless of the data.

**Quicksort** instead partitions the array around a pivot: elements less than the pivot go left, greater go right, and the pivot lands in its final sorted position — then each side is sorted recursively the same way. Its average case is O(n log n) but a naive pivot choice (always first or last element) degrades to O(n^2) on already-sorted or adversarial input, so the pivot is chosen **randomly** here: swapping a random element into the partition position before partitioning makes the O(n^2) worst case astronomically unlikely regardless of the input's original order, turning the *expected* runtime into O(n log n) for any input.

Both are implemented below; `sortArray` in the main `Solution` class uses merge sort for its guaranteed worst-case bound, and `QuickSortSolution` shows the randomized-pivot alternative.

**Time complexity:** O(n log n) for merge sort (worst case) and for quicksort (expected case with randomized pivot).

**Space complexity:** O(n) for merge sort (needs auxiliary arrays to merge into). O(log n) expected auxiliary space for quicksort's recursion stack (in-place partitioning), though O(n) in the rare worst case of maximally unbalanced splits.
