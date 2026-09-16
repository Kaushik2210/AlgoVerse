# 904. Fruit Into Baskets

**Commonly asked at:** Google, Amazon

You're walking along a row of fruit trees, given as `fruits` where `fruits[i]` is the type of fruit at tree `i`. You have exactly 2 baskets, and each basket can only hold a single type of fruit — there's no limit on the amount of fruit each basket can hold. Starting from any tree you like, you must pick exactly one fruit from every tree while moving to the right, stopping once you'd have to put a fruit into a basket it doesn't fit in. Return the maximum number of fruits you can pick.

**Example 1:**
```
Input: fruits = [1,2,1]
Output: 3
Explanation: We can pick all 3 trees, using two baskets for types 1 and 2.
```

**Example 2:**
```
Input: fruits = [0,1,2,2]
Output: 3
Explanation: We can pick trees [1,2,2], using baskets for types 1 and 2.
```

**Example 3:**
```
Input: fruits = [1,2,3,2,2]
Output: 4
Explanation: We can pick trees [2,3,2,2], using baskets for types 2 and 3.
```

**Constraints:**
- 1 <= fruits.length <= 10^5
- 0 <= fruits[i] < fruits.length

## Approach

This is really just "longest subarray with at most 2 distinct values" wearing a fruit costume. The two baskets are the two distinct fruit types you're allowed to be carrying at once.

A brute-force check of every subarray and counting distinct types in each is O(n^2). Instead, use a variable-size sliding window with a frequency map. Expand the window by moving `right` forward one tree at a time, adding that fruit's type to the map. Whenever the map holds more than 2 distinct types, the window is invalid — shrink it from the left, decrementing counts and removing a type entirely once its count hits zero, until only 2 types remain.

The key insight is that the window is always the largest *valid* window ending at `right` once the shrinking loop finishes, so `right - left + 1` at that point is a candidate for the answer. Because `left` only ever moves forward and never resets, the whole scan is still O(n) — each tree is added to the map once and removed at most once.

**Time complexity:** O(n) — each index enters and leaves the window at most once.

**Space complexity:** O(1) — the frequency map holds at most 3 distinct fruit types at any instant (2 valid plus the one that just triggered a shrink).
