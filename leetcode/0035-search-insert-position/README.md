# 35. Search Insert Position

**Commonly asked at:** Amazon

You're given a sorted array of distinct integers `nums` and a `target` value. Return the index of `target` if it's in the array. If it's not, return the index where it would be inserted to keep the array sorted.

**Example 1:**
```
Input: nums = [1,3,5,6], target = 5
Output: 2
```

**Example 2:**
```
Input: nums = [1,3,5,6], target = 2
Output: 1
```

**Example 3:**
```
Input: nums = [1,3,5,6], target = 7
Output: 4
```

**Constraints:**
- 1 <= nums.length <= 10^4
- nums is sorted in ascending order with distinct values
- Algorithm must run in O(log n) time

## Approach

Scanning left to right and stopping at the first element `>= target` would work, but it's O(n), and the O(log n) requirement plus the sorted, distinct array are both screaming binary search.

Run a standard binary search for `target`. If found, return that index directly. If the search space closes without finding it, the pointer `lo` naturally ends up sitting exactly at the first index whose value is greater than `target` — which is precisely where `target` should be inserted. That works because every element binary search rules out to the left of `lo` is confirmed smaller than `target`, and everything from `lo` onward (once the loop ends) is confirmed greater.

So there's no need for special-case insert logic at all: run the same `lo < hi` binary search used for lower-bound searches, and whatever `lo` is when it terminates is the answer, whether or not `target` was actually present.

**Time complexity:** O(log n) — binary search over a sorted array.

**Space complexity:** O(1).
