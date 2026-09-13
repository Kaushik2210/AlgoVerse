# 16. 3Sum Closest

Given an array `nums` and a target, find three numbers whose sum is closest to `target`. Return that sum. Assume exactly one closest answer exists.

**Example 1:**
```
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: -1 + 2 + 1 = 2 is closest to 1
```

**Example 2:**
```
Input: nums = [0,0,0], target = 1
Output: 0
```

## Approach

Checking every triple is O(n^3); the same sort-then-two-pointer trick from 3Sum applies here since the structure of the problem is identical, just optimizing for "closest" instead of "exactly equal."

Sort `nums`. Fix the first number with a loop over index `i`, then two-pointer scan `left = i + 1` and `right = n - 1` across the rest: compute the current triple sum, and if it's closer to `target` than the best found so far, update the best. Then move the pointers the same way 3Sum does — if the sum is less than `target`, moving `left` right can only increase the sum (getting it closer if it was too small); if the sum is greater than `target`, moving `right` left decreases it. If the sum exactly equals `target`, that's the closest possible (distance 0), so it can return immediately.

Unlike 3Sum, there's no need to skip duplicate values here — the goal isn't collecting unique triples, just tracking the single best sum, so re-examining an equal value can't produce a worse or duplicate-conflicting answer, it would just redundantly recompute the same sum.

**Time complexity:** O(n^2) — O(n log n) sort plus an O(n) loop with an O(n) two-pointer scan inside.

**Space complexity:** O(1) extra (ignoring sort space).
