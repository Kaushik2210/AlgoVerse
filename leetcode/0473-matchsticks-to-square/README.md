# 473. Matchsticks to Square

**Commonly asked at:** Google

You have `matchsticks` where `matchsticks[i]` is the length of the `i`th matchstick. You want to use all the matchsticks to make one square. You should not break any stick, but you can link them up, and each matchstick must be used exactly one time. Return `true` if you can make this square and `false` otherwise.

**Example 1:**
```
Input: matchsticks = [1,1,2,2,2]
Output: true
Explanation: You can form a square with length 2, one side of the square came two sticks with length 1.
```

**Example 2:**
```
Input: matchsticks = [3,3,3,3,4]
Output: false
Explanation: You cannot find a way to form a square with all the matchsticks.
```

**Constraints:**
- 1 <= matchsticks.length <= 15
- 1 <= matchsticks[i] <= 10^8

## Approach

Same shape as partitioning an array into k equal-sum subsets, with k fixed at 4: the four sides of the square are four buckets that must each sum to `total / 4`.

Check divisibility by 4 first, and bail out early if any single matchstick is longer than a side would need to be. Sort the sticks descending so the backtracking search places the hardest-to-fit sticks first — a long stick either fits into one of the four partially-filled sides or the whole branch fails immediately, instead of wasting time placing lots of small sticks before discovering a big one has nowhere to go.

Recurse stick by stick, and for each one try adding it to each of the four sides in turn:
- Skip a side if adding this stick would push it past `side` length.
- Skip a side if it's empty and an earlier empty side (same current sum) was already tried and failed — empty sides are interchangeable, so retrying is wasted work. Track sums already attempted at this call via a small set and `break` once an empty one fails.
- Recurse into the next stick; backtrack (undo the addition) if that path doesn't pan out.

Placing every stick successfully means every side landed exactly on `side`, since the total was already confirmed divisible by 4.

**Time complexity:** Exponential in the worst case (roughly O(4^n)), but the descending sort and empty-side pruning keep it practical for the given constraints (n <= 15).

**Space complexity:** O(n) for recursion depth plus O(1) for the four side sums.
