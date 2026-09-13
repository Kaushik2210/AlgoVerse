# 1136. Parallel Courses

> **Note:** This is a LeetCode premium problem, so it can't be opened or submitted on a free account. Solved and verified independently against hand-built test cases.

There are `n` courses, labeled 1 to `n`. You're given `relations`, where `relations[i] = [prevCourse_i, nextCourse_i]` means `prevCourse_i` must be completed before `nextCourse_i`. In one semester, you can take any number of courses as long as all of their prerequisites were completed in a previous semester. Return the minimum number of semesters needed to complete all courses, or -1 if it's impossible (a cycle in the prerequisites).

**Example 1:**
```
Input: n = 3, relations = [[1,3],[2,3]]
Output: 2
Explanation: Semester 1: courses 1, 2. Semester 2: course 3.
```

**Example 2:**
```
Input: n = 3, relations = [[1,2],[2,3],[3,1]]
Output: -1
Explanation: 1 -> 2 -> 3 -> 1 is a cycle, no valid order exists.
```

**Constraints:**
- 1 <= n <= 5000
- 1 <= relations.length <= 5000
- relations[i].length == 2
- 1 <= prevCourse_i, nextCourse_i <= n
- prevCourse_i != nextCourse_i
- All pairs in relations are unique

## Approach

This is Kahn's algorithm (BFS topological sort) run in "layers," where each layer is exactly one semester. Build the prerequisite graph as an adjacency list plus an in-degree count for every course. Start with all courses that have in-degree 0 (no prerequisites) — those can all be taken in semester 1.

Process the graph level by level, same shape as a multi-source BFS: take the current frontier (every course whose prerequisites are all satisfied), "complete" all of them at once (this is one semester), then for each of their dependent courses decrement its in-degree — any course whose in-degree drops to 0 becomes part of the next frontier. Count how many levels/semesters this takes.

If every course ends up processed by the end, return the semester count. If the queue empties out before all `n` courses have been visited, there must be a cycle (some courses never reach in-degree 0), so return -1.

**Time complexity:** O(n + e) where e is the number of prerequisite relations — every node and edge is processed once.

**Space complexity:** O(n + e) for the adjacency list, in-degree array, and queue.
