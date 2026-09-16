# 1203. Sort Items by Groups Respecting Dependencies

**Commonly asked at:** Google

There are `n` items, each belonging to a group given by `group[i]` — a group id from `0` to `m-1`, or `-1` if the item doesn't belong to any group. You're also given `beforeItems[i]`, a list of items that must come before item `i` in the returned order. Additionally, items in the same group must end up contiguous in the result. Return a valid ordering of all items satisfying both constraints, or an empty array if no valid ordering exists.

**Example 1:**
```
Input: n = 8, m = 2, group = [-1,-1,1,0,0,1,0,-1], beforeItems = [[],[6],[5],[6],[3,6],[],[],[]]
Output: [6,3,4,5,2,0,7,1]
Explanation: Any output satisfying "grouped items stay contiguous" and "every beforeItems dependency is respected" is accepted — the exact tie-breaking order can vary between valid solutions.
```

**Example 2:**
```
Input: n = 3, m = 2, group = [0,0,1], beforeItems = [[1],[0],[]]
Output: []
Explanation: item 0 needs item 1 first, and item 1 needs item 0 first - a cycle, so no valid order exists.
```

**Constraints:**
- 1 <= m <= n <= 3 * 10^4
- group.length == beforeItems.length == n
- -1 <= group[i] <= m-1
- 0 <= beforeItems[i].length <= n-1
- 0 <= beforeItems[i][j] <= n-1
- i != beforeItems[i][j]
- beforeItems[i] doesn't contain duplicates

## Approach

This has two nested ordering constraints — items within a group must respect their own dependencies, and groups themselves must respect whatever order their cross-group dependencies force — so it needs topological sorting on two levels.

**Step 1 — give every ungrouped item its own group.** Any item with `group[i] == -1` gets assigned a brand-new, otherwise-unused group id (continuing on from `m`). Now every item belongs to exactly one group, and a "group of one" behaves exactly like a normal group under the rest of the algorithm — no special casing needed anywhere else.

**Step 2 — build two graphs from one pass over beforeItems.** For every dependency `dep -> i` (dep must come before i):
- Always add the edge `dep -> i` to the item-level graph — this constrains item order regardless of grouping.
- If `dep` and `i` belong to different groups, that also forces `group[dep]` before `group[i]` at the group level, so add an edge `group[dep] -> group[i]` in the group graph (deduplicated, since the same pair of groups can get this edge from many item pairs).

**Step 3 — topologically sort both graphs with Kahn's algorithm.** Sort the group graph first; if it has a cycle (the processed order comes up short of all groups), return `[]` immediately. Then topologically sort the *entire* item graph across all items at once — since this item-level order already respects every `beforeItems` edge, including the ones inside a single group, the order it produces is valid within each group too, without needing a second separate sort per group.

**Step 4 — merge.** Walk the item-level topological order and bucket each item under its group. Then walk the group-level topological order and concatenate each group's item bucket in turn — the result keeps every group's items contiguous (buckets are only ever appended as whole groups) while preserving a dependency-respecting order both within and across groups.

If either topological sort can't process every node (a cycle at the group level or the item level), return `[]`.

**Time complexity:** O(n + e), where n is the number of items and e is the total number of dependency pairs across all of `beforeItems` — building the graphs, both topological sorts, and the merge are all linear in the graph size.

**Space complexity:** O(n + e + m) for the item graph, group graph, in-degree arrays, and the group buckets.
