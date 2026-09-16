# 364. Nested List Weight Sum II

**Commonly asked at:** Google

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway since it's the natural inverse-weight follow-up to "Nested List Weight Sum" (339).*

You're given a nested list of integers `nestedList`, structured the same way as in problem 339. This time the weight is flipped: an integer at the deepest level gets weight 1, and every level closer to the top gets one more. In other words, an integer's weight is `maxDepth - depth + 1`, where `depth` is its own nesting depth and `maxDepth` is the deepest level anything in the whole structure reaches. Return the sum of every integer times its weight.

**Example 1:**
```
Input: nestedList = [[1,1],2,[1,1]]
Output: 8
Explanation: maxDepth = 2. The four 1's sit at depth 2 (weight 1), the 2 sits at depth 1 (weight 2). 1*1*4 + 2*2 = 4 + 4 = 8
```

**Example 2:**
```
Input: nestedList = [1,[4,[6]]]
Output: 17
Explanation: maxDepth = 3. 1 is at depth 1 (weight 3), 4 is at depth 2 (weight 2), 6 is at depth 3 (weight 1). 1*3 + 4*2 + 6*1 = 3 + 8 + 6 = 17
```

**Constraints:**
- `1 <= nestedList.length <= 50`
- The values of the integers in the nested list are in the range `[0, 100]`
- The maximum depth of any integer is less than or equal to `50`

## Approach

The catch versus problem 339 is that the weight of an integer depends on `maxDepth`, which you don't know until you've seen the whole structure — so this needs two passes instead of one.

First pass: a DFS that just tracks the deepest nesting level reached anywhere in the structure, ignoring integer values entirely — only descending into nested lists updates the answer.

Second pass: the same DFS shape as problem 339, but instead of weighting by `depth`, weight by `maxDepth - depth + 1`, which is exactly the reverse — the shallowest integers now get the biggest multiplier and the deepest ones get 1.

An alternative single-pass trick exists (accumulate a running "level sum" and add it to the total once per level, so shallow levels naturally get counted more times), but the two-pass version is more directly readable and costs nothing extra asymptotically since both passes are linear.

**Time complexity:** O(n) for each of the two passes, so O(n) overall, where n is the total count of integers and lists.

**Space complexity:** O(d) for the recursion stack on each pass, where d is the maximum nesting depth.
