# 611. Valid Triangle Number

Given an array of non-negative integers, count how many triplets can form the three sides of a triangle with positive area (the triangle inequality must hold: the sum of any two sides must exceed the third).

**Example 1:**
```
Input: nums = [2,2,3,4]
Output: 3
Explanation: valid triangles are (2,3,4), (2,3,4), (2,2,3).
```

**Example 2:**
```
Input: nums = [4,2,3,4]
Output: 4
```

**Constraints:**
- 1 <= nums.length <= 1000
- 0 <= nums[i] <= 1000

## Approach

Checking all three triangle-inequality conditions for every triplet is O(n^3) and mostly redundant: once the array is sorted, if `a <= b <= c`, then `a + c > b` and `b + c > a` are automatically true (since `c` is the largest, adding anything positive to it only helps). So the *only* condition that actually needs checking for a sorted triple is `a + b > c`, where `c` is the largest of the three.

Sort the array, then fix `nums[k]` as the largest side and use two pointers `i` and `j` starting at the two ends of the remaining prefix `nums[0..k-1]`. If `nums[i] + nums[j] > nums[k]`, that pair works — but so does every pair `(nums[i'], nums[j])` for `i <= i' < j`, since those `nums[i']` values are all `>= nums[i]` and would only make the sum bigger. So credit all `j - i` of them at once, then shrink `j` to look for other pairs summing with a smaller partner. If the sum isn't big enough, `nums[i]` is too small to work with this `j` (or anything smaller than `j`), so advance `i` to try a bigger left value instead.

**Time complexity:** O(n^2) — sorting is O(n log n), but the outer loop over `k` combined with the inner two-pointer scan (which does O(n) work per `k`) gives O(n^2) overall.

**Space complexity:** O(1) extra (ignoring the sort's own space).
