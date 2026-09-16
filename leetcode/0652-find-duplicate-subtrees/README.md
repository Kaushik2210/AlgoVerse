# 652. Find Duplicate Subtrees

**Commonly asked at:** Amazon, Facebook, Google

You're given the root of a binary tree. Return the roots of all subtrees that appear more than once — subtrees with the exact same structure and node values. Only one root per distinct duplicated subtree shape needs to be returned, even if that shape repeats three or more times.

**Example 1:**
```
Input: root = [1,2,3,4,null,2,4,null,null,4]
Output: [[2,4],[4]]
Explanation: The subtree rooted at value 4 (a single leaf node) appears three times, and the subtree [2,4] appears twice. Each duplicated shape is only returned once.
```

**Example 2:**
```
Input: root = [2,1,1]
Output: [[1]]
```

**Example 3:**
```
Input: root = [2,2,2,3,null,3,null]
Output: [[2,3],[3]]
```

**Constraints:**
- The number of nodes is in the range [1, 5000]
- -200 <= Node.val <= 200

## Approach

Comparing subtrees pairwise directly would be quadratic and awkward — the natural move is to turn every subtree into a comparable string, then let a hashmap do the duplicate detection.

Do a postorder traversal (children fully processed before the parent) and, at every node, build a serialized string representing that entire subtree's structure — something like `val,leftSerialization,rightSerialization`, using an explicit marker (e.g. `#`) for null children so that structurally different trees never accidentally produce the same string. Postorder is essential here because a subtree's serialization needs its children's serializations already computed before it can build its own.

Keep a hashmap from serialization string to occurrence count. Every time a node's serialization is computed, look it up: if the count for that string is exactly `1` before incrementing (i.e. this is the *second* time this exact subtree shape has been seen), add this node to the answer list. If the count is `0` or already `2+`, don't add it — `0` means it's the first occurrence (not yet a duplicate), and `2+` would mean it's already been added once and adding it again would create a duplicate entry in the output. Then increment the count regardless.

**Time complexity:** O(n^2) worst case in the strictest sense (building each serialization string can take time proportional to the subtree's size, and there are n subtrees), though in practice with hashing of strings it behaves close to O(n) for typical trees; using a hashmap keeps the lookup itself O(1) average per node.

**Space complexity:** O(n^2) worst case for storing all the serialized strings (each up to O(n) long in a skewed tree), O(n) more typically.
