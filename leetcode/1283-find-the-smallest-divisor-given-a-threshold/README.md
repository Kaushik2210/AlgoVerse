# 1283. Find the Smallest Divisor Given a Threshold

Given an array `nums` and an integer `threshold`, choose a positive integer `divisor` and divide every element of `nums` by it, rounding each result up to the nearest integer, then sum those rounded values. Find the smallest `divisor` such that this sum is <= `threshold`.

**Example 1:**
```
Input: nums = [1,2,5,9], threshold = 6
Output: 5
Explanation: With divisor 5: ceil(1/5)+ceil(2/5)+ceil(5/5)+ceil(9/5) = 1+1+1+2 = 5 <= 6.
Divisor 4 gives 1+1+2+3 = 7 > 6, so 5 is the smallest that works.
```

**Example 2:**
```
Input: nums = [44,22,33,11,1], threshold = 5
Output: 44
```

**Constraints:**
- 1 <= nums.length <= 5 * 10^4
- 1 <= nums[i] <= 10^6
- nums.length <= threshold <= 10^6

## Approach

This is essentially "Koko Eating Bananas" wearing a different costume — same feasibility shape, just division instead of eating rate.

For a candidate `divisor`, computing the total is a direct O(n) sum of `ceil(x / divisor)` over all `x` in `nums`. A `divisor` is feasible if that sum is <= `threshold`.

This is monotonic: increasing the divisor only ever shrinks (or keeps equal) each individual `ceil(x/d)` term, so the total sum is non-increasing as `divisor` grows. That's exactly what binary search needs — search `divisor` from 1 up to `max(nums)` (any divisor that large or bigger makes every term at most 1, which is the smallest each term can possibly be), and shrink toward the smallest divisor whose total sum stays within `threshold`.

**Time complexity:** O(n log(max(nums))) — each binary search step sums ceiling-divisions over all n elements.

**Space complexity:** O(1) extra space.
