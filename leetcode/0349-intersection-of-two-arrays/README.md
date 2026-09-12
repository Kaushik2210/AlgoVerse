# 349. Intersection of Two Arrays

Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must be unique, and the result can be returned in any order.

**Example 1:**
```
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
```

**Example 2:**
```
Input: nums1 = [4,9,5], nums2 = [9,4,9,8]
Output: [9,4]
Explanation: The intersection can be returned in any order.
```

**Constraints:**
- 1 <= nums1.length, nums2.length <= 1000

## Approach

Since duplicates don't matter for the output (each value appears once regardless of how many times it repeats in either array), sets are the natural fit. Convert both arrays to sets — that alone throws away duplicates within each array — then intersect the two sets, which keeps only values present in both. Converting the result back to a list gives the answer.

This is really just leaning on the set data structure to do exactly what's being asked: membership across two collections with no regard for order or repeat counts. A manual version without a built-in intersection operator would build a set from the smaller array, then walk the other array once checking membership in that set and collecting the ones that match into a result set (to dedupe as they're found).

**Time complexity:** O(n + m) — building each set is linear in its array's size, and computing the intersection is linear in the size of the smaller set.

**Space complexity:** O(n + m) for the sets built from both arrays.
