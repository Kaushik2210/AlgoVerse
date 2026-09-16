# 719. Find K-th Smallest Pair Distance

**Commonly asked at:** Google, Facebook

The distance of a pair of integers `a` and `b` is defined as `|a - b|`. Given an integer array `nums` and an integer `k`, return the `k`-th smallest distance among all pairs `(nums[i], nums[j])` with `i < j`.

**Example 1:**
```
Input: nums = [1,3,1], k = 1
Output: 0
Explanation: The pairs and their distances are (1,3) -> 2, (1,1) -> 0, (3,1) -> 2.
The smallest distance is 0.
```

**Example 2:**
```
Input: nums = [1,1,1], k = 2
Output: 0
```

**Example 3:**
```
Input: nums = [1,6,1], k = 3
Output: 5
```

**Constraints:**
- n == nums.length
- 2 <= n <= 10^4
- 0 <= nums[i] <= 10^6
- 1 <= k <= n * (n - 1) / 2

## Approach

Generating and sorting all pairwise distances is O(n^2 log n) and too slow for n up to 10^4 (up to ~5*10^7 pairs). Instead, binary search on the *value* of the answer: the distance itself.

Sort `nums` first. Now, for any candidate distance `d`, count how many pairs have distance <= `d`. On a sorted array, this count can be computed in O(n) with a sliding window: for each right endpoint, slide the left endpoint forward while `nums[right] - nums[left] > d`; once the window is valid, every index between `left` and `right` pairs with `right` at distance <= `d`, contributing `right - left` pairs. This works because the array is sorted, so `nums[right] - nums[left]` is the maximum distance within that window, and it only shrinks as `left` increases.

This count is monotonic in `d` — a larger `d` only ever admits more pairs. That's the condition binary search needs: we want the smallest `d` such that `count_le(d) >= k`, since that's the value at which the `k`-th smallest distance lands. Binary search `d` between 0 (identical elements can pair at distance 0) and `nums[-1] - nums[0]` (the maximum possible spread once sorted), shrinking toward the smallest feasible `d`.

**Time complexity:** O(n log n) to sort, plus O(n log(max - min)) for the binary search, each step doing an O(n) sliding-window count.

**Space complexity:** O(log n) for the sort, O(1) extra otherwise.
