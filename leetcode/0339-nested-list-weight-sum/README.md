# 339. Nested List Weight Sum

**Commonly asked at:** Google, Meta

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway since it pairs naturally with "Flatten Nested List Iterator" (341) and is a clean warm-up for the depth-aware variant (364).*

You're given a nested list of integers `nestedList`, where each element is either an integer or a list that can itself contain integers and further nested lists. The **depth** of an integer is how many lists it's nested inside, starting at 1 for the outermost level. Return the sum of every integer multiplied by its depth.

**Example 1:**
```
Input: nestedList = [[1,1],2,[1,1]]
Output: 10
Explanation: four 1's at depth 2, one 2 at depth 1 -> 1*2 + 1*2 + 2*1 + 1*2 + 1*2 = 10
```

**Example 2:**
```
Input: nestedList = [1,[4,[6]]]
Output: 27
Explanation: 1*1 + 4*2 + 6*3 = 1 + 8 + 18 = 27
```

**Constraints:**
- `1 <= nestedList.length <= 50`
- The values of the integers in the nested list are in the range `[-100, 100]`
- The maximum depth of any integer is less than or equal to `50`

## Approach

This is a straight tree walk — each element of `nestedList` is either a leaf (an integer) or an internal node (another list of `NestedInteger`s), and the "weight" of a leaf is just its depth in that tree.

Do a recursive DFS carrying the current depth along. Starting at depth 1 for the top-level list, for every element: if it's an integer, add `value * depth` to the running total; if it's a list, recurse into it with `depth + 1` and add whatever that subtree contributes. There's no need to track anything except the current depth, since depth only depends on how many list levels you've descended through, not on position within a list.

**Time complexity:** O(n) where n is the total count of integers and lists across the whole nested structure — every element is visited exactly once.

**Space complexity:** O(d) for the recursion stack, where d is the maximum nesting depth.
