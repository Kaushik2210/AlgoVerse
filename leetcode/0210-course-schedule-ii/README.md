# 210. Course Schedule II

There are `numCourses` courses labeled `0` to `numCourses - 1`. You're given a list of prerequisite pairs `prerequisites[i] = [a, b]`, meaning you must take course `b` before course `a`. Return an ordering of all courses you could take to finish all of them. If it's impossible (a cycle exists), return an empty array. If there are multiple valid orderings, any one of them is fine.

**Example 1:**
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
```

**Example 2:**
```
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,1,2,3] or [0,2,1,3]
```

**Example 3:**
```
Input: numCourses = 1, prerequisites = []
Output: [0]
```

**Constraints:**
- 1 <= numCourses <= 2000
- 0 <= prerequisites.length <= numCourses * (numCourses - 1)

## Approach

This is Course Schedule (207) but instead of just answering yes/no about whether a valid order exists, we need to actually produce one — which is a textbook case for Kahn's algorithm (BFS-based topological sort) rather than the DFS cycle check used before, since Kahn's naturally builds the order as it goes.

Build a graph where an edge points from a prerequisite to the course that depends on it (`b -> a`), and track each course's in-degree (how many prerequisites it still needs). Any course with in-degree 0 has nothing blocking it, so start a queue with all of those. Repeatedly pop a course from the queue, append it to the result order, and "remove" it from the graph by decrementing the in-degree of everything it points to — any neighbor that drops to in-degree 0 becomes newly available and gets pushed onto the queue.

If this process produces an order covering all `numCourses` courses, that's the answer. If it stalls out early with courses left over, those remaining courses are stuck in a cycle (nothing among them ever reaches in-degree 0), so there's no valid order — return an empty array.

**Time complexity:** O(V + E) — every course and every prerequisite edge is processed once.

**Space complexity:** O(V + E) — the adjacency list, in-degree array, and queue.
