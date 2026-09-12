# 286. Walls and Gates

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway because it's a classic multi-source BFS interview question, and it's basically the direct ancestor of the free "Rotting Oranges" problem.*

You're given an `m x n` grid of rooms initialized with one of three values:
- `-1` — a wall or obstacle
- `0` — a gate
- `2147483647` (`INF`) — an empty room

Fill each empty room with the distance to its nearest gate. If a room can't reach any gate, leave it as `INF`. Modify the grid in place.

**Example 1:**
```
Input:
[[INF,-1,0,INF],
 [INF,INF,INF,-1],
 [INF,-1,INF,-1],
 [0,-1,INF,INF]]

Output:
[[3,-1,0,1],
 [2,2,1,-1],
 [1,-1,2,-1],
 [0,-1,3,4]]
```

**Constraints:**
- m == rooms.length, n == rooms[i].length
- 1 <= m, n <= 250
- rooms[i][j] is -1, 0, or 2^31 - 1

## Approach

Doing a search outward from every empty room individually toward the nearest gate would mean repeated, overlapping work. Flip it around, same as "Rotting Oranges": start a BFS from every gate *simultaneously*, since gates are the fixed points and there could be several of them. A multi-source BFS naturally computes, for every reachable cell, the shortest distance to whichever source is closest — which is exactly "distance to nearest gate".

Seed a queue with every gate's coordinates (distance 0). Run standard level-by-level BFS: for each cell popped, look at its 4 neighbors; if a neighbor is an empty room (still `INF`, meaning "not yet assigned a distance"), set its distance to current distance + 1 and push it onto the queue. Walls are simply never enqueued since they don't match the "still INF" check, so BFS naturally routes around them. Because BFS explores in increasing distance order and each cell's `INF` marker doubles as its "not yet visited" flag, the first time any room is reached is guaranteed to be via the shortest path from the nearest gate — no cell is ever revisited or overwritten with a worse distance.

**Time complexity:** O(m*n) — each cell is enqueued and processed at most once.

**Space complexity:** O(m*n) for the BFS queue in the worst case (e.g. every cell is a gate).
