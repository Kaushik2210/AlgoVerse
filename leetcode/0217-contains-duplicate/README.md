# 217. Contains Duplicate

Given an array of integers, determine if any value shows up more than once. Return `true` if there's a duplicate anywhere, `false` if every element is distinct.

**Example 1:**
```
Input: nums = [1,2,3,1]
Output: true
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: false
```

**Constraints:**
- 1 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9

## Approach

The naive way is to compare every element against every other element — nested loops, O(n^2). You could improve that a bit by sorting first (O(n log n)) and then just checking if any two adjacent elements are equal, which works but still costs more than necessary.

The fastest approach just needs a way to ask "have I seen this value before?" in constant time — which is exactly what a hash set gives you. Walk through the array once, and for each number, check if it's already in the set. If it is, you've found your duplicate and can return immediately. If not, add it to the set and keep going. If you get through the whole array without a hit, there are no duplicates.

**Time complexity:** O(n) — one pass, O(1) average-case set lookups and insertions.

**Space complexity:** O(n) — worst case (no duplicates at all) the set ends up holding every element.
