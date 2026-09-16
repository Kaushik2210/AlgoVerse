# 755. Pour Water

**Commonly asked at:** Airbnb, Oracle

**Note: this is a LeetCode premium (paid-only) problem — the statement below is reconstructed from the public problem description.**

You're given `heights`, an elevation map of unit-width columns, an integer `volume` (the number of water drops to pour), and an index `k` (where each drop is poured). Each drop falls straight down from above `heights[k]`, then repeatedly tries to move to a lower neighboring column: first checking left, then right, moving as long as the next column isn't higher. If neither direction offers anywhere lower, the drop settles in place, raising that column's height by 1. Return the final heights after pouring all the water.

**Example 1:**
```
Input: heights = [2,1,1,2,1,2,2], volume = 4, k = 3
Output: [2,2,2,3,2,2,2]
```

**Example 2:**
```
Input: heights = [1,2,3,4], volume = 2, k = 2
Output: [2,3,3,4]
```

**Example 3:**
```
Input: heights = [3,1,3], volume = 5, k = 1
Output: [4,4,4]
```

**Constraints:**
- 1 <= heights.length <= 100
- 0 <= heights[i], k < heights.length
- 0 <= volume <= 2000

## Approach

Each drop is simulated independently and greedily, exactly the way water actually behaves: it prefers to keep flowing downhill, and between two equally good directions it checks left first.

For one drop starting at column `k`: scan leftward as long as each next column's height is `<=` the current one (water can rest on a flat column but won't climb). While scanning, track the lowest column seen so far (`best`) — since a descending-then-flat run should settle at its lowest point, not just wherever the scan happens to stop. If that leftward scan found anywhere lower than `k` itself, the drop settles there (raise that column by 1) and move to the next drop. Otherwise (left offered nothing lower), repeat the same scan to the right. If neither side has anywhere lower, the drop just stacks on top of column `k`.

Doing this once per unit of volume, updating `heights` in place between drops, correctly models later drops interacting with the terrain reshaped by earlier ones.

Verified against all three official examples: `[2,1,1,2,1,2,2], volume=4, k=3` -> `[2,2,2,3,2,2,2]`, `[1,2,3,4], volume=2, k=2` -> `[2,3,3,4]`, and `[3,1,3], volume=5, k=1` -> `[4,4,4]`.

**Time complexity:** O(volume * n) — each of the `volume` drops does an O(n) scan in the worst case.

**Space complexity:** O(1) extra, modifying `heights` in place.
