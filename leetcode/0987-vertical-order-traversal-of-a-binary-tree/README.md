# 987. Vertical Order Traversal of a Binary Tree

You're given the root of a binary tree. Assign every node a `(row, col)` coordinate: the root is at `(0, 0)`, a left child is at `(row + 1, col - 1)`, and a right child is at `(row + 1, col + 1)`. Group nodes by column from leftmost to rightmost; within each column, order top to bottom by row, and if multiple nodes land on the exact same `(row, col)`, order them by increasing value. Return the grouped values as a list of columns.

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
Explanation: Column -1 has node 9. Column 0 has nodes 3 and 15 (3 at row 0, 15 at row 2). Column 1 has node 20. Column 2 has node 7.
```

**Example 2:**
```
Input: root = [1,2,3,4,5,6,7]
Output: [[4],[2],[1,5,6],[3],[7]]
```

**Example 3:**
```
Input: root = [1,2,3,4,6,5,7]
Output: [[4],[2],[1,5,6],[3],[7]]
Explanation: Nodes 5 and 6 land on the same (row, col); ties break by increasing value, so 5 comes before 6 regardless of tree structure.
```

**Constraints:**
- The number of nodes is in the range [1, 1000]
- 0 <= Node.val <= 1000

## Approach

There are three independent sort keys stacked on top of each other (column, then row, then value), and the cleanest way to get all three right without fiddly comparator logic is to just collect every `(col, row, val)` triple during a traversal and sort the whole collected list once.

Traverse the tree — BFS or DFS both work, since final ordering is decided entirely afterward by the sort, not by traversal order — and for every node record its `(row, col, val)`. Track `col` starting at 0 for the root, `-1` for a left step and `+1` for a right step from the parent; track `row` similarly, `+1` for either child from the parent.

Once every node's triple is collected, sort the whole list by the tuple `(col, row, val)` — Python's tuple sort (and most languages' stable multi-key sort) naturally handles "primary key column, secondary key row, tertiary key value" in one call, since it compares tuples element by element. Then walk the sorted list and group consecutive entries that share the same `col` into their own output list.

**Time complexity:** O(n log n) — visiting every node is O(n), but sorting all n triples dominates.

**Space complexity:** O(n) for the collected triples and the output structure.
