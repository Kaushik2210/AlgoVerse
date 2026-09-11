# 207. Course Schedule

There are `numCourses` courses labeled `0` to `numCourses - 1`. You're given a list of prerequisite pairs `prerequisites[i] = [a, b]`, meaning you must take course `b` before course `a`. Determine whether it's possible to finish all courses.

**Example 1:**
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: take course 0, then course 1
```

**Example 2:**
```
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: course 1 needs course 0, and course 0 needs course 1 — impossible
```

**Constraints:**
- 1 <= numCourses <= 2000
- 0 <= prerequisites.length <= 5000
- prerequisites[i].length == 2

## Approach

This is really a question about a directed graph: draw an edge from each course to its prerequisite, and ask whether that graph has a cycle. If it does, some group of courses depends on itself and none of them can ever be scheduled first; if it doesn't, you can always find a valid order.

Trying to brute-force an actual ordering (repeatedly picking any course with no unmet prerequisite) works too, but the cleanest way to directly answer "is there a cycle" is a DFS with three-coloring. Every node starts **unvisited**. When you start exploring a node, mark it **visiting** — meaning it's an ancestor on the current DFS path. If your DFS ever reaches a neighbor that's already marked **visiting**, that's a back edge to something on the current path, which means a cycle. If a node's neighbors all get explored without hitting a **visiting** node, mark it **visited** (fully processed, guaranteed cycle-free below it) so future DFS calls can skip it immediately instead of re-walking that subgraph.

Run this DFS from every course that hasn't been visited yet. If any of those searches finds a cycle, finishing all courses is impossible; if none do, it's possible.

**Time complexity:** O(V + E) — every course and every prerequisite edge is visited once, thanks to the "visited" state short-circuiting repeat work.

**Space complexity:** O(V + E) — the adjacency list plus the recursion stack and state array.
