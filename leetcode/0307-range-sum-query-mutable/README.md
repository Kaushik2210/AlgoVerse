# 307. Range Sum Query - Mutable

Design a data structure that supports two operations on an integer array `nums`: updating the value at an index, and querying the sum of a range `[left, right]`, both efficiently and interleaved in any order.

**Example 1:**
```
Input:
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]

Output: [null, 9, null, 8]
Explanation:
NumArray a = new NumArray([1, 3, 5]);
a.sumRange(0, 2); // 1 + 3 + 5 = 9
a.update(1, 2);   // nums becomes [1, 2, 5]
a.sumRange(0, 2); // 1 + 2 + 5 = 8
```

**Constraints:**
- 1 <= nums.length <= 3 * 10^4
- -100 <= nums[i] <= 100
- 0 <= index < nums.length
- -100 <= val <= 100
- 0 <= left <= right < nums.length
- At most 3 * 10^4 calls total to `update` and `sumRange`.

## Approach

A plain prefix-sum array answers `sumRange` in O(1), but a single `update` would force rebuilding the whole prefix array in O(n). A plain running total per index has the opposite problem: O(1) update but O(n) range query. We need something that's efficient at both, which is exactly what a Fenwick tree (Binary Indexed Tree) gives — O(log n) for both operations.

A BIT stores partial sums where each index `i` (1-indexed internally) is responsible for a range of elements determined by its lowest set bit. To add a delta at a position, keep jumping to `i += i & (-i)` and adding the delta there, propagating the change up through every partial-sum node that covers that position — that's `_add`. To get the prefix sum up to a position, keep jumping to `i -= i & (-i)` and accumulating, walking down through the nodes that together cover the prefix — that's `_prefix_sum`.

`update(index, val)` computes the delta between the new and old value, stores the new value, and applies the delta via `_add`. `sumRange(left, right)` is just `_prefix_sum(right) - _prefix_sum(left - 1)`, handled with a guard when `left == 0`.

**Time complexity:** O(log n) per `update` or `sumRange` call, O(n log n) for the initial build.

**Space complexity:** O(n) for the tree array.
