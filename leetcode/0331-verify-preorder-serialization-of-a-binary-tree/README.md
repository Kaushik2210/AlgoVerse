# 331. Verify Preorder Serialization of a Binary Tree

One way to serialize a binary tree is to record its preorder traversal, writing `#` for every null child. Given a comma-separated string of such a serialization, determine if it could be a valid preorder serialization of *some* binary tree, without actually reconstructing the tree.

**Example 1:**
```
Input: preorder = "9,3,4,#,#,1,#,#,2,#,6,#,#"
Output: true
```

**Example 2:**
```
Input: preorder = "1,#"
Output: false
```

**Example 3:**
```
Input: preorder = "9,#,#,1"
Output: false
```

**Constraints:**
- 1 <= preorder.length <= 10^4
- preorder consist of digits, commas '#' and '-' (values may be negative multi-digit numbers)

## Approach

Rather than building the tree, think in terms of open "slots": a binary tree, viewed as a sequence of node-placement decisions, always starts with exactly one available slot (the root's position). Every node consumed — real or `#` — fills one open slot. A `#` (null) opens no new slots, since it's a leaf placeholder. A real value node opens exactly two new slots, one for each of its children.

Walk the tokens left to right, maintaining a running slot count starting at 1. For each token: if there are no slots left (`slots <= 0`) but there's still a token to place, the sequence is invalid — trying to place a node where none was expected (this catches cases like `"1,#"`, which finishes with an unfilled slot still needed, or `"9,#,#,1"`, where the extra `1` shows up after the tree already closed out). Consume one slot for the current node, then add 2 more if it's a real value.

At the very end, a valid full binary tree must have used up every slot exactly — no dangling open slots and no negative overflow along the way. So the string is valid preorder serialization if and only if `slots == 0` after processing every token.

**Time complexity:** O(n) — one pass over the comma-separated tokens.

**Space complexity:** O(n) for splitting the string into tokens (O(1) extra beyond that if streamed).
