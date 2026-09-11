# 78. Subsets

You're given an array `nums` of unique integers. Return every possible subset (the power set), with no duplicate subsets. Subsets can be returned in any order.

**Example 1:**
```
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

**Example 2:**
```
Input: nums = [0]
Output: [[],[0]]
```

**Constraints:**
- 1 <= nums.length <= 10
- All elements of `nums` are unique

## Approach

Every element has exactly two states — either it's in a given subset, or it isn't — so there are `2^n` total subsets, and generating them all comes down to walking that decision tree with backtracking.

Think of building subsets by deciding, one element at a time (in index order), whether to include it or not. At each recursive call, the current `path` already represents a valid, complete subset on its own, so record a copy of it into the results immediately (not just at the leaves — every node in the decision tree is a valid subset, including the empty one at the very start). Then loop over the remaining candidates starting from the current index, add one to the path, recurse to consider what comes after it, then remove it again before trying the next candidate. Always moving `start` forward (never revisiting an earlier index) guarantees each subset is only generated once, since it enforces a strict "elements appear in increasing index order" rule that rules out generating the same set twice in a different order.

Unlike Combination Sum, there's no target to check against and no reuse of elements — this is really just "every root-to-node path down the include/exclude tree," so the backtracking here is about as bare as it gets.

**Time complexity:** O(n * 2^n) — there are 2^n subsets, and copying each one into the result costs up to O(n).

**Space complexity:** O(n) for the recursion depth and the `path` buffer, not counting the space needed for the output itself.
