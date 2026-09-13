# 1617. Count Subtrees With Max Distance Between Cities

**Note:** this problem is LeetCode premium (subscriber-only) — no live link to test against, but the statement and expected behavior below are well documented, and the solution here is checked against known example outputs.

There are `n` cities numbered `1` to `n`, connected by `n-1` bidirectional roads forming a tree. For every subset of cities that forms a connected subtree, its diameter is the maximum distance between any two cities in that subset. Return an array `ans` of length `n-1` where `ans[d-1]` is the number of subsets whose diameter is exactly `d`.

**Example 1:**
```
Input: n = 4, edges = [[1,2],[2,3],[2,4]]
Output: [3,4,0]
Explanation: 3 subtrees have diameter 1 (each single edge), 4 have diameter 2 (any 3-city connected subset), and 0 have diameter 3 (there's no 4-city path since node 2 branches into three separate neighbors).
```

**Example 2:**
```
Input: n = 2, edges = [[1,2]]
Output: [1]
```

**Constraints:**
- 2 <= n <= 15
- edges.length == n - 1
- edges[i].length == 2
- 1 <= ui, vi <= n
- The given edges form a valid tree

## Approach

`n <= 15` is the tell: this wants brute force over every possible subset of cities, since there are at most 2^15 = 32768 of them.

For each non-empty bitmask over the `n` cities, first check whether that subset of cities actually forms a *connected* subtree — pick any city in the subset, BFS from it using only edges whose other endpoint is also in the subset, and see whether the BFS reaches every city in the subset. If it doesn't, this particular subset isn't a valid connected subtree (it's split across a road the subset doesn't include), so skip it.

If the subset is connected, find its diameter using the standard two-BFS trick for tree diameters: BFS from any node in the subset to find the farthest reachable node within the subset — that node is guaranteed to be one endpoint of the subset's longest path. Then BFS again from that farthest node; the maximum distance reached this second time is the actual diameter of the subset.

Increment `answer[diameter - 1]` for each valid connected subset found. After checking every subset, `answer` holds the final counts.

**Time complexity:** O(2^n * n) — 2^n subsets, each doing up to two BFS passes over at most n nodes and n-1 edges.

**Space complexity:** O(n) per BFS for the distance array, plus O(n) for the adjacency list.
