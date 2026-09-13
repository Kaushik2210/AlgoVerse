# 1464. Maximum Product of Two Elements in an Array

You're given an integer array `nums`. Choose two distinct indices `i` and `j` to maximize `(nums[i] - 1) * (nums[j] - 1)`. Return that maximum value.

**Example 1:**
```
Input: nums = [3,4,5,2]
Output: 12
Explanation: choosing 5 and 4: (5-1)*(4-1) = 4*3 = 12.
```

**Example 2:**
```
Input: nums = [1,5,4,5]
Output: 16
```

**Constraints:**
- 2 <= nums.length <= 500
- 1 <= nums[i] <= 10

## Approach

`(a - 1) * (b - 1)` is maximized by maximizing `a` and `b` directly — subtracting 1 from each is a fixed shift that doesn't change which pair of underlying values is biggest, and every `nums[i] >= 1` guarantees `a - 1 >= 0` and `b - 1 >= 0`, so there's no sign-flip edge case where a pair of very negative values would multiply into something larger (unlike, say, "maximum product of three numbers" where negatives can flip a sign). That means the answer always comes from the two *largest* elements in `nums`.

So do a single linear scan, tracking the largest (`first`) and second-largest (`second`) values seen so far. For each number: if it beats `first`, it becomes the new `first` and the old `first` demotes to `second`; otherwise, if it beats `second` (but not `first`), it just replaces `second`. After the scan, the answer is `(first - 1) * (second - 1)`.

**Time complexity:** O(n) — one pass through the array.

**Space complexity:** O(1) — only two tracking variables needed.
