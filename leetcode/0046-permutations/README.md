# 46. Permutations

You're given an array of distinct integers `nums`. Return every possible permutation of the array, in any order.

**Example 1:**
```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Example 2:**
```
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

**Constraints:**
- 1 <= nums.length <= 6
- All integers in `nums` are distinct

## Approach

There's no shortcut around enumerating permutations — the answer size is `n!`, so any correct solution has to touch every one of them. The question is just how to generate them cleanly, which is backtracking's bread and butter.

Build a permutation one slot at a time. At each step, try placing every number that hasn't been used yet in the current path, recurse to fill the next slot, then undo the choice (pop it back off, mark it unused again) before trying the next candidate. A boolean `used` array tracks which indices are already committed to the current path in O(1), so at each recursive call you loop over all `n` numbers and skip the ones already placed.

Whenever the path's length reaches `n`, that's a complete permutation — copy it into the results (copy, not a reference, since `path` keeps getting mutated afterward).

**Time complexity:** O(n * n!) — there are n! permutations, and building/copying each one costs O(n).

**Space complexity:** O(n) for the recursion depth, the `path`, and the `used` array, not counting the O(n * n!) needed to store all the output permutations.
