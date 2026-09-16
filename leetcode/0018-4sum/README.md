# 18. 4Sum

**Commonly asked at:** Amazon

Given an array `nums` and a target, find all unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` (distinct indices) that sum to `target`. The result must not contain duplicate quadruplets.

**Example 1:**
```
Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
```

**Example 2:**
```
Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
```

## Approach

This is 3Sum with one more layer of nesting. Brute-force checking every 4-index combination is O(n^4); the standard improvement is the same one that turns 3Sum from O(n^3) into O(n^2): sort the array first, fix the first two numbers with nested loops, then use a two-pointer sweep over the remaining sorted sub-array for the last two — collapsing what would be two more nested loops into a single linear pass.

Sort `nums`. Loop `i` over the array for the first number, loop `j > i` for the second, then run a two-pointer scan with `left = j + 1` and `right = n - 1` for the last two: if the four-sum is too small, move `left` right; too big, move `right` left; exactly right, record the quadruplet and advance both pointers.

Duplicate quadruplets are avoided by skipping repeated values at every level: after choosing `nums[i]`, skip forward past any equal value before trying the next `i`; same for `j`; and inside the two-pointer loop, after recording a match, advance `left` and `right` past any runs of duplicate values before continuing. Because the array is sorted, all duplicates of a given value are adjacent, so "skip forward while equal to the previous" reliably prevents the same quadruplet from being emitted twice.

A useful early-exit: if the four smallest remaining values already sum to more than `target`, or the four largest already sum to less than `target`, that branch can be pruned entirely, since sorted order guarantees no combination in between could possibly work either. This isn't required for correctness but helps avoid needless inner-loop work.

**Time complexity:** O(n^3) — two nested loops (O(n^2)) times an O(n) two-pointer scan, plus O(n log n) for the sort.

**Space complexity:** O(1) extra beyond the output (ignoring the O(log n) or O(n) sort's own space).
