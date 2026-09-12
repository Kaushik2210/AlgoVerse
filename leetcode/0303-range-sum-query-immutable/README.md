# 303. Range Sum Query - Immutable

Given an integer array `nums`, handle multiple queries of the form: calculate the sum of the elements between indices `left` and `right` inclusive. Implement `NumArray`: `NumArray(int[] nums)` initializes the object, and `sumRange(int left, int right)` returns the sum of `nums[left..right]`.

**Example 1:**
```
Input:
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output:
[null, 1, -1, -3]
Explanation:
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
```

**Constraints:**
- 1 <= nums.length <= 10^4
- There will be at most 10^4 calls to sumRange

## Approach

Recomputing the sum by walking `nums[left..right]` on every call is O(n) per query, which adds up fast with up to 10^4 queries against an array of up to 10^4 elements. Since the array itself never changes ("Immutable"), the fix is to precompute once and answer every query in constant time.

Build a prefix-sum array `prefix` where `prefix[i]` holds the sum of `nums[0..i-1]` (so `prefix[0] = 0` and `prefix[i] = prefix[i-1] + nums[i-1]`). Then the sum of any range `[left, right]` is just `prefix[right + 1] - prefix[left]` — the total up through `right`, minus everything before `left`, leaving exactly the elements in between. The 1-indexed offset on `prefix` (size n+1) avoids having to special-case `left == 0`.

**Time complexity:** O(n) to build the prefix array once in the constructor; O(1) per `sumRange` call afterward.

**Space complexity:** O(n) for the prefix array.
