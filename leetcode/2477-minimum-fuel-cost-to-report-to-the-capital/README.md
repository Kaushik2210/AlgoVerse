# 2477. Minimum Fuel Cost to Report to the Capital

There are `n` cities connected by `n-1` roads forming a tree rooted at the capital, city `0`. Every city other than the capital has exactly one representative who needs to travel to the capital. Each car holds `seats` representatives, and traveling along one road costs 1 liter of fuel per car making that trip (a car can carry fewer than `seats` people, but still costs a full liter). Cars can merge and split freely along the way. Return the minimum total liters of fuel needed to get every representative to the capital.

**Example 1:**
```
Input: roads = [[0,1],[0,2],[0,3]], seats = 5
Output: 3
Explanation: each of the 3 representatives from cities 1, 2, 3 needs their own single trip straight to the capital (they can't combine since none of their roads overlap), costing 1 liter each: 3 total.
```

**Example 2:**
```
Input: roads = [[3,1],[3,2],[1,0],[0,4],[0,5],[4,6]], seats = 2
Output: 7
```

**Constraints:**
- 1 <= n <= 10^5
- roads.length == n - 1
- roads[i].length == 2
- 0 <= ai, bi < n
- roads represent a valid tree

## Approach

Every representative's path to the capital is forced — a tree has exactly one path between any node and the root — so the real question is just how many representatives pass through each edge, and how many carloads that takes.

For an edge connecting a node `u` to its parent, every representative living in `u`'s subtree (including `u` itself) must cross that edge exactly once on their way up. So the number of "passengers" on that edge is simply the size of `u`'s subtree, and the fuel cost for that one edge is `ceil(subtree_size(u) / seats)` — that many carloads are needed to move everyone across, even if the last carload isn't full. Summing this over every edge in the tree gives the total fuel.

Compute subtree sizes with a post-order DFS from the capital: process a node only after all of its children have been processed, so `subtree_size[u] = 1 + sum(subtree_size[child] for child in children)`. As each child's subtree size becomes final, immediately charge the fuel for the edge from that child up to its parent (`ceil(child_subtree_size / seats)`) and add the child's size into the parent's running total.

Since n can reach 10^5, the DFS is done iteratively: first walk the tree from the root pushing nodes onto a stack to build a valid processing order (each node appears before its children in this list), then walk that list in reverse so every node is only finalized after all its children have already contributed to it.

**Time complexity:** O(n) — every node and edge is visited a constant number of times.

**Space complexity:** O(n) for the adjacency list, subtree-size array, and traversal order.
