# 238. Product of Array Except Self

Given an integer array `nums`, return a new array `answer` where `answer[i]` is the product of every element in `nums` except `nums[i]`. You have to do this without using the division operator, and ideally in O(n) time.

**Example 1:**
```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

**Example 2:**
```
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
```

**Constraints:**
- 2 <= nums.length <= 10^5
- The product of any prefix or suffix fits in a 32-bit integer

## Approach

The tempting shortcut is: compute the total product of the whole array, then for each index divide by `nums[i]`. That's O(n), but it breaks the moment there's a zero in the array (division by zero), and the problem explicitly says no division anyway.

Instead, notice that `answer[i]` is just "the product of everything to the left of i" times "the product of everything to the right of i". So compute those two pieces separately. First pass, left to right: build a `prefix` array where `prefix[i]` holds the product of all elements before index i. Second pass, right to left: keep a running suffix product, and multiply it into `answer[i]` (which already holds the prefix product from the first pass) as you go. By the end, each `answer[i]` is exactly prefix * suffix — everything except itself.

You can even do the prefix pass directly into the output array and just use a single extra variable for the running suffix, so you don't need a second full array beyond the output — that gets you to O(1) extra space, not counting the output itself.

**Time complexity:** O(n) — two linear passes over the array.

**Space complexity:** O(1) extra space (excluding the output array) — one running suffix product variable.
