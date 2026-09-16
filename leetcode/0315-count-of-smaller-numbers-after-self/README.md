# 315. Count of Smaller Numbers After Self

**Commonly asked at:** Google

You're given an integer array `nums`. Return a new array `counts` where `counts[i]` is the number of elements to the right of `nums[i]` that are strictly smaller than `nums[i]`.

**Example 1:**
```
Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation: to the right of 5 there are 2 smaller (2,1). To the right of 2 there's 1 smaller (1). To the right of 6 there's 1 smaller (1). To the right of 1 there's nothing.
```

**Example 2:**
```
Input: nums = [-1]
Output: [0]
```

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

## Approach

The brute-force double loop is O(n^2), too slow for n up to 10^5. The classic trick is to piggyback the counting on top of merge sort: while merge sort is combining two already-sorted halves, it's naturally comparing every left-half element against every right-half element it "passes" — and that comparison is exactly what's needed to count smaller elements to the right.

Sort an array of *indices* (not the values themselves) by their corresponding `nums` value, recursively. During the merge step of two sorted index ranges `[lo, mid)` and `[mid, hi)`, walk both with pointers `i` and `j`. Track `right_taken`, the count of elements from the right half already pulled into the merged output. Whenever the element at `indices[i]` (left half) is taken — because it's `<=` the current right-half candidate — every one of those `right_taken` elements from the right half is smaller than it *and* originally sat to its right in the array (since the right half's elements all had larger original indices). So add `right_taken` to `counts[indices[i]]` at that moment. When a right-half element is taken instead, just increment `right_taken` and move on — no count changes for it, since we're only counting right-of-self here.

Because merge sort processes contiguous sub-ranges recursively, this correctly accumulates counts from every recursive merge step: an element only needs comparing against elements strictly to its right within its own current range, and those ranges eventually stitch together to cover the whole array. Elements from unrelated parts of the array that never share a merge step being compared are, by construction, already accounted for in an earlier or later recursion level.

**Time complexity:** O(n log n) — standard merge sort recursion, with O(n) work done per merge across O(log n) levels.

**Space complexity:** O(n) for the indices array, the counts array, and the temporary merged buffer.
