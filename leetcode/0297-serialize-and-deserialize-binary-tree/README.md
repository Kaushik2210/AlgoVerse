# 297. Serialize and Deserialize Binary Tree

Design an algorithm to serialize a binary tree to a single string, and deserialize that string back into the original tree structure. There's no constraint on the specific format, as long as a tree serialized by your algorithm can be deserialized back to the same tree by your algorithm.

**Example 1:**
```
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]
Explanation: the tree round-trips through serialize/deserialize back to an identical structure
```

**Example 2:**
```
Input: root = []
Output: []
```

**Constraints:**
- The number of nodes in the tree is in the range [0, 10^4]
- -1000 <= Node.val <= 1000

## Approach

The core difficulty is that a tree's shape isn't fully determined by its values alone — you need to also encode *where the gaps are* (which children are missing), otherwise deserialization can't tell where one subtree ends and another begins. The cleanest way to do that is a preorder traversal (root, then left subtree, then right subtree) with explicit null markers written into the output wherever a child is missing.

**Serialize:** do a preorder DFS. At each node, append its value to the output; at a `null` position, append a sentinel marker (e.g. `"#"`) instead and stop recursing there. Join everything with a delimiter (e.g. a comma) into one string.

**Deserialize:** split the string back into tokens by the delimiter, and reconstruct with a matching preorder DFS, consuming tokens from the front one at a time (a simple index or iterator works well here). If the next token is the null marker, return `null` for this position — that's the base case. Otherwise, create a node with that value, then recursively build its left subtree first (consuming however many tokens that takes), then its right subtree — this order has to mirror the serialization order exactly, since preorder always fully finishes the left branch before touching the right one, and there's no length prefix telling deserialize where a subtree ends other than following the same structural rule serialize used to write it.

Preorder (as opposed to inorder or postorder) is the natural choice here because it processes the root before its children, which lines up with "here's the null marker deciding whether to even start a subtree" — with inorder, you'd need extra bookkeeping to know when a `null` belongs to the left vs. right side of an already-written root.

**Time complexity:** O(n) for both serialize and deserialize — every node is visited exactly once.

**Space complexity:** O(n) for the output string / token array, plus O(h) recursion stack depth where h is the tree height.
