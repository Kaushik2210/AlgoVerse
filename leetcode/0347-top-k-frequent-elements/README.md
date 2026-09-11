# 347. Top K Frequent Elements

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You can return the answer in any order.

**Example 1:**
```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

**Example 2:**
```
Input: nums = [1], k = 1
Output: [1]
```

**Constraints:**
- It's guaranteed that the answer is unique
- 1 <= k <= number of distinct elements in `nums`

## Approach

Once you count how often each number appears, the obvious next step is to sort those (value, count) pairs by count and take the top k. That works, but sorting the whole thing costs O(n log n) when you really only need the top k, not a full ordering — that's more work than the problem asks for.

A tighter approach uses **bucket sort** on frequency. Since a number can appear at most `n` times (where n is the length of the array), you can create `n + 1` buckets, where bucket `i` holds all the numbers that appeared exactly `i` times. Count frequencies with a hash map first (O(n)), drop each number into its frequency bucket (O(n)), then walk the buckets from the highest frequency down to the lowest, collecting numbers until you've got k of them. Because there are only n+1 possible frequency buckets, this walk is bounded by O(n) too.

This sidesteps the log factor entirely — no comparison-based sort is needed since frequencies are bounded integers, which is exactly the situation bucket sort is built for.

**Time complexity:** O(n) — counting is linear, bucketing is linear, and scanning at most n+1 buckets is linear.

**Space complexity:** O(n) — the frequency map and the buckets both scale with the number of distinct elements/array length.
