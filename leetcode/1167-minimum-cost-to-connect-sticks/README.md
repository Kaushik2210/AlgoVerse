# 1167. Minimum Cost to Connect Sticks

**Commonly asked at:** Amazon, Google

You have some sticks, each with a positive length, given in the array `sticks`. Connecting two sticks costs their combined length, and produces one new stick of that combined length. Keep connecting sticks until only one remains, and return the minimum total cost to do so.

**Example 1:**
```
Input: sticks = [2,4,3]
Output: 14
Explanation: Connect 2+3 = 5 (cost 5), then 5+4 = 9 (cost 9). Total = 5+9 = 14.
```

**Example 2:**
```
Input: sticks = [1,8,3,5]
Output: 30
```

**Constraints:**
- 1 <= sticks.length <= 10^4
- 1 <= sticks[i] <= 10^4

## Approach

Every connection's cost gets added to the running total, and — because a stick's combined length can go on to be part of later connections too — a length that gets folded in early ends up contributing to the total multiple times over. So the length of any short stick should get "locked in" as early as possible, before it has a chance to keep compounding.

That's exactly the greedy that works: always combine the two currently-shortest sticks. Use a min-heap so the two smallest are always available in O(log n), pop them, add their sum to the answer, and push that sum back in as a new stick (since it now competes with everything else for the next round). Repeat until one stick is left.

This is the same idea as building an optimal (Huffman-style) merge tree — the two cheapest items should always merge first, minimizing how many times the smaller values get "re-paid" in higher-level merges.

**Time complexity:** O(n log n) — each of the roughly n-1 merges does two pops and one push on a heap of size O(n).

**Space complexity:** O(n) for the heap.
