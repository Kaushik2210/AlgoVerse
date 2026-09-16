# 1482. Minimum Number of Days to Make m Bouquets

**Commonly asked at:** Amazon, Google

Given an integer array `bloomDay`, an integer `m`, and an integer `k`: `bloomDay[i]` is the day the `i`-th flower blooms. You need `m` bouquets, each made of `k` **adjacent** flowers from the garden, and a flower can only be used once it has bloomed. Return the minimum number of days needed to be able to make all `m` bouquets, or `-1` if it's impossible.

**Example 1:**
```
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Each bouquet only needs 1 flower. By day 3, flowers 0, 2, 4 (bloom days 1, 3, 2) have bloomed, giving 3 bouquets.
```

**Example 2:**
```
Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: 3 bouquets of 2 adjacent flowers need 6 flowers total, but there are only 5.
```

**Example 3:**
```
Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
Output: 12
```

**Constraints:**
- bloomDay.length == n
- 1 <= n <= 10^5
- 1 <= m <= 10^6
- 1 <= k <= n
- 1 <= bloomDay[i] <= 10^9

## Approach

First the easy exit: if `m * k > n`, there simply aren't enough flowers to ever form `m` bouquets, so return `-1` immediately without searching anything.

Otherwise, this is the same binary-search-on-the-answer pattern as the rest of this cluster, just with a different feasibility check. For a candidate `day`, a flower is "available" if `bloomDay[i] <= day`. Bouquets must use `k` *adjacent* available flowers, so scan the array left to right, tracking a running streak of consecutive available flowers; every time the streak hits `k`, that's one bouquet, and reset the streak to 0 (an unavailable flower also resets the streak, since it breaks adjacency). Count total bouquets formed this way; `day` is feasible if that count is >= `m`.

This is monotonic: waiting longer (larger `day`) only ever makes more flowers available, never fewer, so the bouquet count is non-decreasing in `day`. Binary search `day` between `min(bloomDay)` (nothing usable before that) and `max(bloomDay)` (everything usable by then), converging on the smallest `day` for which the feasibility check passes.

**Time complexity:** O(n log(max(bloomDay) - min(bloomDay))) — each binary search step does one O(n) pass.

**Space complexity:** O(1) extra space.
