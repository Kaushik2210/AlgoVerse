# 536. Construct Binary Tree from String

**Commonly asked at:** Amazon, Meta

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

You're given a string representing a binary tree, made up of a root value followed by zero, one, or two bracketed child expressions in the same recursive format: `value(left subtree)(right subtree)`. If a node has only a left child, the right parenthesis pair is omitted entirely. Values can be negative. Reconstruct and return the tree.

**Example 1:**
```
Input: s = "4(2(3)(1))(6(5))"
Output: [4,2,6,3,1,5]
Explanation: Root 4 has left child 2 (which has children 3 and 1) and right child 6 (which has left child 5, no right child).
```

**Example 2:**
```
Input: s = "-4(2(3)(1))(6(5)(7))"
Output: [-4,2,6,3,1,5,7]
```

**Constraints:**
- 0 <= s.length <= 3 * 10^4
- s consists of digits, '(', ')', and '-' only
- The number of parentheses is balanced, and the values fit within a 32-bit integer

## Approach

The grammar is naturally recursive, so a recursive-descent parser handles it directly with a single shared index cursor instead of splitting the string or scanning for matching brackets ahead of time: `parseNode()` reads an integer, then checks whether the next character is `(`. If so, it consumes that `(`, recursively parses the left subtree, then consumes the matching `)`. It then repeats the same check for a right subtree. Since a right child can only exist if a left child is present first (per the format's own rule that an empty left forces an omitted right too), checking sequentially — left first, then right — naturally matches the string's structure without extra bookkeeping.

Parsing the integer itself needs to handle an optional leading `-` for negative values, then consume all following digits.

Because the cursor only ever moves forward and each character is visited exactly once (as part of a number, or as a paren consumed exactly when entering/leaving a subtree), the whole string is processed in one linear pass, with the recursion depth mirroring the tree's height.

**Time complexity:** O(n) — every character of the string is examined a constant number of times.

**Space complexity:** O(h) for the recursion stack (worst case O(n) for a skewed tree), plus O(n) for the tree nodes created.
