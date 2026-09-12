# 690. Employee Importance

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because "sum values down a tree/graph of subordinates" is a common warm-up for tree/graph traversal interviews.*

You're given a list of employees, where each employee has a unique `id`, an `importance` value, and a list of `subordinates` (by id). Given an employee id, return the total importance of that employee plus all of their subordinates, direct and indirect.

**Example 1:**
```
Input: employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1
Output: 11
Explanation: Employee 1 has importance 5, and has two direct subordinates: employee 2 (importance 3) and employee 3 (importance 3). So the total is 5 + 3 + 3 = 11.
```

**Example 2:**
```
Input: employees = [[1,2,[5]],[5,-3,[]]], id = 5
Output: -3
```

**Constraints:**
- 1 <= employees.length <= 2000
- Each employee's id is unique
- -100 <= importance <= 100
- One employee has at most one direct leader and there's no cycle among employees

## Approach

The employee list is really an adjacency list in disguise: each employee's `subordinates` field points to the neighbors reachable from them. The problem is asking for "the sum of all node values reachable from the given start node," which is a plain graph/tree traversal.

First build a map from `id` to the employee object so any employee can be looked up in O(1) instead of scanning the list every time. Then run DFS (or BFS) starting from the given id: add the current employee's importance to a running total, and recurse into each of their subordinates, doing the same for each one. Since the problem guarantees no cycles and each employee has at most one leader, this is really a tree (or forest) rooted at the queried id, so there's no need to track visited nodes — just walk down until every branch bottoms out at a leaf with no subordinates.

**Time complexity:** O(n) — building the id-to-employee map is O(n), and the traversal visits each employee under the queried root exactly once.

**Space complexity:** O(n) for the map plus O(h) for the recursion stack, where h is the depth of the reporting tree.
