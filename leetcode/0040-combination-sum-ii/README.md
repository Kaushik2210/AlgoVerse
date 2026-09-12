# 40. Combination Sum II

Given a collection of candidate numbers `candidates` (which may contain duplicates) and a target number, find all unique combinations where the numbers sum to `target`. Each number in `candidates` may be used at most once in a combination. The solution set must not contain duplicate combinations.

**Example 1:**
```
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

**Example 2:**
```
Input: candidates = [2,5,2,1,2], target = 5
Output:
[
[1,2,2],
[5]
]
```

**Constraints:**
- 1 <= candidates.length <= 100
- 1 <= candidates[i] <= 50
- 1 <= target <= 30

## Approach

This is close to Combination Sum (39), but with two differences that change the backtracking: candidates can repeat as values in the input array (e.g. two separate `1`s), each individual candidate can only be used once (not reused like problem 39), and yet the output still must not contain duplicate combinations even though duplicate values exist in the input.

Sort the array first — this groups equal values together and also lets the search prune early once the remaining sum goes negative (since all further candidates are only larger). Then backtrack starting from an index that only ever moves forward (never reuse the same index, since each candidate can only be used once) — advancing to `i + 1` in the recursive call rather than staying at `i` is what "combination sum" becomes "each element used at most once."

The duplicate-avoidance trick: within a single level of the recursion (i.e. while choosing what to add next at a given position in the path), skip over any candidate that's equal to the one immediately before it, as long as it isn't the very first choice being considered at that level (`i > start`). This lets duplicate values still be used across different depths of the recursion (necessary, e.g. two `1`s can both appear in one combination) but stops the same value from being chosen twice as the "next pick" at the same decision point, which is exactly what would produce duplicate combinations.

**Time complexity:** O(2^n) in the worst case — the search still explores an exponential number of subsets before pruning, though the sort + skip-duplicates + negative-sum pruning cut this down substantially in practice.

**Space complexity:** O(n) for the recursion depth and the current path, plus the space for the output.
