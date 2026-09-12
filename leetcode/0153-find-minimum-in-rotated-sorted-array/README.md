# 153. Find Minimum in Rotated Sorted Array

Suppose an array of length n, sorted in ascending order with **distinct values**, gets rotated between 1 and n times. For example, `[0,1,2,4,5,6,7]` rotated 4 times becomes `[4,5,6,7,0,1,2]`. Given the rotated array `nums`, return the minimum element, in O(log n) time.

**Example 1:**
```
Input: nums = [3,4,5,1,2]
Output: 1
```

**Example 2:**
```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
```

**Example 3:**
```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The array wasn't actually rotated (or rotated a full n times, same thing).
```

**Constraints:**
- 1 <= nums.length <= 5000
- -5000 <= nums[i] <= 5000
- All the integers of nums are unique
- nums is sorted and rotated between 1 and n times

## Approach

A linear scan for the minimum is O(n) and technically correct, but it ignores the fact that the array has structure: a rotated sorted array is really two sorted runs stitched together, with the "rotation point" being where the array drops from a high value back down to a low one. That structure is exactly what lets binary search find the answer in O(log n).

Binary search with `left` and `right` pointers. At each step, look at the middle element `nums[mid]` and compare it to `nums[right]`:
- If `nums[mid] > nums[right]`, the minimum can't be in the left half (`nums[left..mid]` is sorted with everything ≥ `nums[left]`, and the drop must happen somewhere to the right of `mid`) — so the minimum lies in `nums[mid+1..right]`, move `left = mid + 1`.
- Otherwise (`nums[mid] <= nums[right]`), the right half from `mid` to `right` is itself sorted (no drop in it), meaning `mid` itself could be the minimum — so keep `mid` in play and set `right = mid` (not `mid - 1`, since `mid` might be the answer).

The loop ends when `left == right`, which lands on the index of the minimum. Comparing against `nums[right]` rather than `nums[left]` is what makes this work cleanly — it directly tells you which side contains the "break."

**Time complexity:** O(log n) — binary search halves the search space each step.

**Space complexity:** O(1) — just a couple of index variables.
