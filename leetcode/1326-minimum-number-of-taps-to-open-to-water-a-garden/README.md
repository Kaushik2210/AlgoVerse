# 1326. Minimum Number of Taps to Open to Water a Garden

**Commonly asked at:** Google

There's a 1-D garden on the x-axis from point 0 to point `n`. There are `n + 1` taps, located at points `0, 1, ..., n`. You're given an array `ranges` of length `n + 1`, where `ranges[i]` (if it's positive) means the tap at point `i` can water the range `[i - ranges[i], i + ranges[i]]`. Return the minimum number of taps needed to water the entire garden `[0, n]`, or -1 if it's impossible.

**Example 1:**
```
Input: n = 5, ranges = [3,4,1,1,0,0]
Output: 1
Explanation: The tap at index 1 has range 4, so it waters [1-4, 1+4] = [-3, 5], which clips to [0, 5].
That single tap already covers the whole garden, so only 1 tap is needed.
```

**Example 2:**
```
Input: n = 3, ranges = [0,0,0,0]
Output: -1
Explanation: Every tap has range 0, so nothing gets watered.
```

**Constraints:**
- 1 <= n <= 10^4
- ranges.length == n + 1
- 0 <= ranges[i] <= 100

## Approach

Convert each tap into the interval it can water: tap `i` covers `[max(0, i - ranges[i]), min(n, i + ranges[i])]`. Once converted, this becomes exactly the "minimum number of intervals to cover [0, n]" problem, solved the same greedy way as Jump Game II / Video Stitching.

For each starting position `s` from 0 to `n - 1`, compute `farthest[s]`, the farthest right-edge reachable by any tap whose interval starts at or covers `s` (specifically, track the best `end` among all taps with `start <= s`). Then greedily sweep: keep `currentEnd` (rightmost point covered by taps opened so far) and `nextEnd` (best reach achievable by opening one more tap, scanned over all starts up to `currentEnd`). Every time the sweep position catches up to `currentEnd`, that means we've used up all the reach from the current set of taps and must open one more — increment the count and jump `currentEnd` up to `nextEnd`. If `nextEnd` never moved past `currentEnd`, there's a gap that can't be watered, so return -1.

**Time complexity:** O(n) — one pass to build the farthest-reach array from taps, one pass to sweep it.

**Space complexity:** O(n) for the farthest-reach array.
