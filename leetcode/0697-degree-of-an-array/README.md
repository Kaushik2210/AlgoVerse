# 697. Degree of an Array

**Commonly asked at:** Amazon

The degree of an array is the maximum frequency of any one of its elements. Given a non-empty array of non-negative integers `nums`, return the length of the shortest contiguous subarray that has the same degree as `nums`.

**Example 1:**
```
Input: nums = [1, 2, 2, 3, 1]
Output: 2
Explanation: The degree is 2 (values 1 and 2 both appear twice). A shortest subarray with degree 2 is [2, 2].
```

**Example 2:**
```
Input: nums = [1, 2, 2, 3, 1, 4, 2]
Output: 6
```

**Constraints:**
- 1 <= nums.length <= 5 * 10^4
- 0 <= nums[i] <= 5 * 10^4

## Approach

Two things need tracking per distinct value: how often it appears (to find the degree), and the span between its first and last occurrence (since any subarray matching that value's frequency has to stretch at least from its first appearance to its last — nothing shorter can contain all of its copies).

One pass over `nums` builds three maps: first-seen index, last-seen index, and a running count per value. After that pass, the degree is just the largest count. Then, among every value whose frequency equals that degree, the shortest subarray achieving it is `last_index - first_index + 1` for that value — take the minimum of these across all such values, since a subarray spanning exactly one high-frequency value's first-to-last occurrence trivially contains the required number of copies of it (the endpoints themselves guarantee that).

Verified against `[1,2,2,3,1]` -> 2 (degree 2, shortest span is the [2,2] pair) and `[1,2,2,3,1,4,2]` -> 6 (degree 3 for the value 2, spanning index 1 to 6).

**Time complexity:** O(n) — one pass to build the maps, one pass over distinct values to find the answer.

**Space complexity:** O(n) for the three maps, bounded by the number of distinct values.
