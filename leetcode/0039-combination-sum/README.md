# 39. Combination Sum

You're given an array of distinct positive integers `candidates` and a `target`. Find every unique combination of numbers from `candidates` that adds up exactly to `target`. You can reuse the same number as many times as you want, and the same combination shouldn't appear twice (order within a combination doesn't matter).

**Example 1:**
```
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
```

**Example 2:**
```
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

**Constraints:**
- 1 <= candidates.length <= 30
- 2 <= candidates[i] <= 40
- All elements of `candidates` are distinct
- 1 <= target <= 40

## Approach

There's no clever shortcut here — this is a "generate every valid combination" problem, so it calls for backtracking. The trick is avoiding duplicate combinations and keeping the search from blowing up unnecessarily.

Build combinations one number at a time, tracking a running sum (or equivalently, how much of the target is still `remaining`). At each step, only consider candidates starting from the current index forward, never looking backward — that's what stops `[2,3]` and `[3,2]` from both being generated as separate paths. Since a number can be reused, when you pick `candidates[i]`, the next recursive call still starts from index `i` (not `i + 1`), so the same number is eligible again.

Whenever `remaining` hits exactly 0, the current path is a valid combination — copy it into the results. If `remaining` drops below 0, this path overshot the target and can be abandoned immediately (prune it, don't keep recursing). Backtrack by popping the last number off the path after exploring it, so the next sibling branch starts clean.

**Time complexity:** O(2^target) in the worst case — the branching factor and depth both depend on how small the candidates are relative to the target, but it's bounded by the number of ways to partition the target using the candidates.

**Space complexity:** O(target / min(candidates)) for the recursion depth and current path, plus the space needed to store all the output combinations.
