# 659. Split Array into Consecutive Subsequences

You're given an integer array `nums` sorted in non-decreasing order. Determine if it's possible to split it into one or more subsequences such that each subsequence consists of consecutive integers and has length at least 3.

**Example 1:**
```
Input: nums = [1,2,3,3,4,5]
Output: true
Explanation: Split into [1,2,3] and [3,4,5].
```

**Example 2:**
```
Input: nums = [1,2,3,3,4,4,5,5]
Output: true
Explanation: Split into [1,2,3,4,5] and [3,4,5].
```

**Example 3:**
```
Input: nums = [1,2,3,4,4,5]
Output: false
```

**Constraints:**
- 1 <= nums.length <= 10^4
- -1000 <= nums[i] <= 1000
- nums is sorted in non-decreasing order

## Approach

The greedy idea: process numbers left to right (the input is already sorted), and for every number, decide immediately whether to append it to an existing run that's waiting for exactly this next value, or to start a brand-new run with it and its two immediate successors. Never leave the decision for later — if a number could extend an existing run, always prefer that, because starting a new run instead only makes life harder for whichever run needed this number to keep going.

To make that greedy choice efficiently, track two hash maps while scanning:
- `count`: how many of each value are left unused in `nums` (decremented as values get consumed).
- `tails`: how many runs currently end exactly at value `v` and are looking for `v + 1` next.

For each number `x` (skip it if `count[x]` is already 0, meaning an earlier step already consumed this occurrence): first check if some existing run ends at `x - 1` (`tails[x-1] > 0`). If so, extend that run — decrement `tails[x-1]`, increment `tails[x]`, and this occurrence of `x` is used. Otherwise, try to start a brand-new run of length 3 beginning at `x`: check whether `x+1` and `x+2` are both still available in `count`; if so, consume all three (`x`, `x+1`, `x+2`) and record a new run now ending at `x+2` (`tails[x+2] += 1`). If neither option works, it's impossible to place `x` anywhere valid, so return `false` immediately.

If every number gets placed this way, every run that was ever started ended up with length >= 3 by construction (each new run begins as three consecutive numbers, and extensions only grow it), so return `true`.

**Time complexity:** O(n) — a single pass with O(1) amortized hash map operations per element.

**Space complexity:** O(n) for the `count` and `tails` maps.
