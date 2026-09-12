# 977. Squares of a Sorted Array

You're given an integer array `nums` sorted in non-decreasing order. Return an array of the squares of each number, also sorted in non-decreasing order.

**Example 1:**
```
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
```

**Example 2:**
```
Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]
```

**Constraints:**
- 1 <= nums.length <= 10^4
- nums is sorted in non-decreasing order

## Approach

Squaring every element and sorting the result works, but that's O(n log n) when the input's sortedness should be exploitable.

The catch is that the original array's negative numbers can produce large squares too, so the biggest squares always come from one of the two ends of the array — never from the middle. Negative numbers shrink toward zero as they approach the middle from the left, and positive numbers grow from zero going right, so the largest magnitude value (positive or negative) always sits at one of the two extremes.

That means a two-pointer sweep from both ends, building the result from the back, does the job in one pass: compare `nums[left]^2` and `nums[right]^2`, place the bigger one at the current back slot of the result array, and move that pointer inward. Repeat until the pointers cross. Since you're always placing the current largest remaining square, the result comes out sorted for free.

**Time complexity:** O(n) — a single pass with two pointers closing in from both ends.

**Space complexity:** O(n) for the output array (required either way since the problem asks for a new sorted array); O(1) extra beyond that.
