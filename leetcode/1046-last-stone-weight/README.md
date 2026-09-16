# 1046. Last Stone Weight

**Commonly asked at:** Amazon, Google

You have a collection of stones, each with a positive weight, given in `stones`. Repeatedly take the two heaviest stones and smash them together: if they're equal weight, both are destroyed; otherwise the lighter one is destroyed and the heavier one's new weight is the difference of the two. Keep going until at most one stone remains, and return its weight (or 0 if none remain).

**Example 1:**
```
Input: stones = [2,7,4,1,8,1]
Output: 1
Explanation: Smashing 8 and 7 leaves a 1. The stones are now [2,4,1,1,1]. Continuing to smash the two heaviest each round eventually leaves one stone of weight 1.
```

**Example 2:**
```
Input: stones = [1]
Output: 1
```

**Constraints:**
- 1 <= stones.length <= 30
- 1 <= stones[i] <= 1000

## Approach

The rule "always smash the two heaviest" is directly a max-heap simulation — there's no cleverness needed beyond picking the right data structure to repeatedly grab the two largest values efficiently.

Push every stone's weight onto a max-heap (Python's `heapq` is a min-heap, so negate the values to simulate one). Repeatedly pop the two largest, and if they aren't equal, push their difference back in as a new stone. Stop when at most one stone is left, and return its weight, or 0 if the heap emptied out completely.

**Time complexity:** O(n log n) — each smash does two pops and at most one push on a heap of size O(n), and there are O(n) smashes.

**Space complexity:** O(n) for the heap.
