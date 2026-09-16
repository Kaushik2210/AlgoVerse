# 1206. Design Skiplist

**Commonly asked at:** Google

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against a stress test comparing every operation to a plain Python list used as a reference.

Design a **Skiplist** without using any built-in libraries, supporting these operations:

- `Skiplist()` — initialize the skiplist object.
- `bool search(int target)` — return whether `target` exists in the skiplist.
- `void add(int num)` — insert `num` into the skiplist.
- `bool erase(int num)` — remove one occurrence of `num` if it exists, returning whether it was removed. If multiple copies of `num` exist, only remove one of them.

**Example:**
```
Input:
["Skiplist", "add", "add", "add", "search", "add", "search", "erase", "erase", "search"]
[[], [1], [2], [3], [0], [4], [1], [0], [1], [1]]

Output:
[null, null, null, null, false, null, true, false, true, false]

Explanation:
Skiplist sl = new Skiplist();
sl.add(1);
sl.add(2);
sl.add(3);
sl.search(0);   // false, 0 was never inserted
sl.add(4);
sl.search(1);   // true
sl.erase(0);    // false, nothing to erase
sl.erase(1);    // true
sl.search(1);   // false, 1 was just erased
```

**Constraints:**
- 0 <= num, target <= 2 * 10^4
- At most 5 * 10^4 calls will be made to `search`, `add`, and `erase`

## Approach

A skiplist is a probabilistic alternative to a balanced BST: instead of rotations, it gets logarithmic search/insert/delete by layering multiple linked lists on top of a sorted base list, where each higher layer skips over more nodes and acts like an "express lane" for search.

**Structure:** Every node stores a value and an array of forward pointers, one per level it participates in — `forward[0]` is the base list (every node has this), `forward[i]` for higher `i` only exists for nodes that got "promoted" to that level. A dummy `head` sentinel with the maximum possible level anchors every layer, so there's no special-casing for inserting at the front.

**Level assignment:** When a new node is added, its level is chosen randomly by flipping a coin repeatedly (`p = 0.5`) — starting at level 0, keep going up a level as long as the flip keeps coming up "promote," capped at a fixed `MAX_LEVEL` (16 is more than enough for 5*10^4 elements). This randomization is what keeps the list balanced *on average* without any explicit rebalancing: roughly half of nodes reach level 1, a quarter reach level 2, and so on, mirroring what a balanced tree's layers would look like.

**Searching (shared by `search`, `add`, `erase`):** Start at `head` at the topmost currently-used level. Walk forward along that level as long as the next node's value is still less than the target, then drop down a level and repeat. This traces out a staircase path that lands, at level 0, on the node immediately before where `target` would be. Record the last node visited at *each* level along the way (`update[]`) — these are exactly the nodes whose forward pointers need to be rewired for an insert or delete at that position.

- `search(target)`: after the staircase walk, check whether `update[0].forward[0]` is a node equal to `target`.
- `add(num)`: after the staircase walk, roll a random level for the new node. If it's taller than every existing node, extend `head`'s reach to cover the new top levels. Then splice the new node into every level from 0 up to its chosen level, using `update[i]` as the predecessor to link after.
- `erase(num)`: after the staircase walk, if `update[0].forward[0]` isn't equal to `num`, there's nothing to remove. Otherwise, for every level where `update[i]` currently points directly at the node being removed, patch it to skip past that node instead. Trim the skiplist's max level down if the topmost levels are now empty.

**Time complexity:** O(log n) expected for `search`, `add`, and `erase`, since each level roughly halves the number of nodes to scan, same intuition as a balanced tree — though unlike a tree this is a probabilistic guarantee, not a worst-case one.

**Space complexity:** O(n) expected total pointers across all nodes, since each node's expected number of levels is a small constant (geometric series with ratio 0.5 sums to 2).
