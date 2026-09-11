# 1. Two Sum

You're given an array of integers `nums` and a target number `target`. Find the indices of the two numbers in the array that add up to `target`, and return them as a pair. You can assume there's exactly one valid answer, and you can't use the same element twice.

**Example 1:**
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9
```

**Example 2:**
```
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]
```

**Constraints:**
- 2 <= nums.length <= 10^4
- Only one valid answer exists

## Approach

The brute-force way is to check every pair of numbers with two nested loops — for each element, scan the rest of the array looking for its complement. That works, but it's O(n^2), and it's doing a lot of repeated, wasted work.

The trick is to flip the question around. Instead of asking "does some other number add up to this one?", ask "have I already seen the number that would complete this pair?" As you walk through the array once, keep a hash map of every value you've seen so far mapped to its index. For each new number `x`, compute `target - x` and just check the map — O(1) lookup. If it's there, you're done. If not, add `x` to the map and keep going.

This works because by the time you reach the second half of a valid pair, the first half is already sitting in the map waiting for you. One pass, one map, done.

**Time complexity:** O(n) — each element is visited once, and hash map lookups/inserts are O(1) on average.

**Space complexity:** O(n) — in the worst case you store almost every element in the map before finding the match.
