# 138. Copy List with Random Pointer

A linked list where each node has an extra `random` pointer that can point to any node in the list (or to `null`). Construct a deep copy of the list — the new list must be made entirely of new nodes, with `next` and `random` pointers set to point at nodes *within the new list*, matching the structure of the original.

**Example 1:**
```
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
Explanation: each pair is [val, random_index] (index into the list, or null).
```

**Example 2:**
```
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]
```

**Example 3:**
```
Input: head = []
Output: []
```

**Constraints:**
- 0 <= n <= 1000
- -10^4 <= Node.val <= 10^4
- Node.random is null or points to some node in the linked list

## Approach

The hard part is `random`: when you're copying a node, the node its `random` pointer targets might not have been created yet (it could point forward in the list), so you can't just wire it up in a single pass the way you could with `next`.

**Two-pass with a hashmap** solves this cleanly:
1. First pass: walk the original list and create a clone of every node (just the value, no pointers wired up yet), storing a mapping from `original_node -> cloned_node` in a hashmap.
2. Second pass: walk the original list again, and for each original node, look up its clone in the map, then set `clone.next = map[original.next]` and `clone.random = map[original.random]`. Since every original node already has an entry in the map from the first pass, this works regardless of whether `random` points forward or backward — and it naturally handles `random = None` too, since `map[None]` is just treated as `None` (or looked up with a default).

This separates "create all the nodes" from "wire up all the pointers," which sidesteps the ordering problem entirely.

(There's also a classic O(1)-extra-space trick — interweave each cloned node right after its original, use that interleaving to set `random` pointers by reading `original.random.next`, then unweave the two lists — but the hashmap approach is simpler to get right and still linear time.)

**Time complexity:** O(n) — two linear passes over the list.

**Space complexity:** O(n) — for the hashmap mapping original nodes to clones (not counting the O(n) output list itself).
