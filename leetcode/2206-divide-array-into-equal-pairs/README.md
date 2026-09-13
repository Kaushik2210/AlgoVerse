# 2206. Divide Array Into Equal Pairs

> **Note:** the task list for this batch referred to this problem as "Divide Array Into Pairs (2160)", but 2160 is actually a different LeetCode problem (Minimum Sum of Four Digit Number After Splitting Digits). This one — "Divide Array Into Equal Pairs" — is LeetCode 2206, confirmed to be a free problem, so it's solved normally below.

You're given an integer array `nums` consisting of `2 * n` integers. You need to divide `nums` into `n` pairs such that every element belongs to exactly one pair, and the two elements of every pair are equal. Return `true` if `nums` can be divided this way, or `false` otherwise.

**Example 1:**
```
Input: nums = [3,2,3,2,2,2]
Output: true
Explanation: pair up as (2,2), (3,3), (2,2).
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: false
Explanation: no way to pair every element with an equal partner.
```

**Constraints:**
- nums.length == 2 * n
- 1 <= n <= 500
- 1 <= nums[i] <= 500

## Approach

Since each pair requires both elements to be equal, every occurrence of a given value has to pair off with another occurrence of the *same* value — a value never pairs with anything else. That means the whole array can be split into valid equal-pairs if and only if **every distinct value appears an even number of times**: an even count of a value can always be split cleanly into count/2 pairs of that value, while an odd count always leaves one leftover copy of that value with no partner.

So just count occurrences of each value (a hash map / counter does this in one pass) and check that every count is even. If any value has an odd count, return false; otherwise return true.

**Time complexity:** O(n) — one pass to build the frequency counts, one pass over the counts (at most 500 distinct values) to check parity.

**Space complexity:** O(k) where k is the number of distinct values in `nums`, for the frequency counter.
