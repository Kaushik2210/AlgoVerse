# 875. Koko Eating Bananas

**Commonly asked at:** Google, Amazon

Koko has `piles` piles of bananas, `piles[i]` bananas in the `i`-th pile. The guards leave for `h` hours. Each hour Koko picks one pile and eats up to `k` bananas from it — if that pile has fewer than `k`, she finishes it and doesn't eat from another pile that same hour. Find the minimum integer eating speed `k` such that she can eat all the bananas within `h` hours.

**Example 1:**
```
Input: piles = [3,6,7,11], h = 8
Output: 4
```

**Example 2:**
```
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

**Example 3:**
```
Input: piles = [30,11,23,4,20], h = 6
Output: 23
```

**Constraints:**
- 1 <= piles.length <= 10^4
- piles.length <= h <= 10^9
- 1 <= piles[i] <= 10^9

## Approach

Same binary-search-on-the-answer pattern again, this time on the eating speed itself. Given a candidate speed `k`, it's easy to compute how many hours Koko needs: for each pile, it takes `ceil(pile / k)` hours (she can't carry leftover eating time from one pile into another). Sum that over all piles to get total hours for speed `k`.

A speed `k` is feasible if that total is <= `h`. Feasibility is monotonic: increasing `k` never increases (and usually decreases) the hours needed, since eating faster only ever finishes piles sooner. So this is a clean binary search — the speed must be at least 1 and never needs to exceed `max(piles)` (any faster and each pile only takes 1 hour anyway). Binary search that range, and on each candidate `k`, compute total hours; if it's within budget, try a smaller `k` (`hi = mid`), otherwise `k` was too slow (`lo = mid + 1`). Converges to the minimum feasible speed.

**Time complexity:** O(n log(max(piles))) — each binary search step sums ceil-divisions over all piles in O(n).

**Space complexity:** O(1) extra space.
