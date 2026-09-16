# 489. Robot Room Cleaner

**Commonly asked at:** Google, Amazon

*Note: this is a LeetCode Premium (subscriber-only) problem, not freely accessible on LeetCode. It's included here anyway since it's a distinctive DFS-with-no-global-coordinates exercise not covered by any other traversal problem in this set.*

You control a robot cleaner in a room modeled as an `m x n` grid, where `1` marks open floor and `0` marks a wall or obstacle. The robot starts at an unknown open cell facing an unknown direction, but you don't get the grid, your position, or your orientation directly — you can only interact with the robot through four API calls:
- `move()`: attempts to move one cell forward; returns `true` and moves if the cell ahead is open, otherwise returns `false` and stays put.
- `turnLeft()` / `turnRight()`: rotates 90 degrees in place without moving.
- `clean()`: cleans the current cell.

Design an algorithm that cleans every reachable open cell in the room, without knowing the room layout in advance.

**Example:**
```
Input: room = [[1,1,1,1,1,0,1,1],[1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,1],[0,0,0,1,0,0,0,0],[1,1,1,1,1,1,1,1]], row = 1, col = 3
Output: every open cell (every 1) gets cleaned exactly once.
Explanation: the room and starting position are only used by the judge to simulate the robot; your code never sees them directly.
```

**Constraints:**
- `1 <= room.length <= 100`
- `1 <= room[i].length <= 200`
- `room[i][j]` is either `0` or `1`
- The number of open cells is at most 300
- The starting cell is always open

## Approach

This is a DFS over the room, but the room graph isn't handed to you — it has to be discovered live through `move()`, and there's no way to query "am I at (r, c)". The fix is to build a local coordinate system: treat the starting cell as `(0, 0)` and track every subsequent position relative to it, using the deltas that `move()` calls produce. As long as the robot's rotations and moves are tracked consistently, this "virtual grid" behaves exactly like a real one for the purposes of DFS.

Keep a `visited` set of these virtual `(r, c)` coordinates and a fixed clockwise direction order — up, right, down, left. At each cell: clean it, then try all 4 directions relative to the *global* virtual grid (not relative to the robot's current heading) by rotating and calling `move()`. If a neighboring cell is open (`move()` returns `true`) and hasn't been visited, recurse into it with the new heading.

The subtlety is getting back. `move()` only goes forward, so after finishing a subtree, the robot needs to return to the parent cell facing the same direction it was in before descending — otherwise the loop trying all 4 directions from the parent breaks. The fix: turn 180 degrees (two `turnRight()` calls), `move()` back into the parent cell, then turn another 180 degrees to restore the original heading. This "turn around, step back, turn around again" is the only way to retreat given an API with no reverse-move primitive.

Because `turnRight()` is called once per direction tried (whether or not that direction was explored), after all 4 directions are attempted from a cell the robot has rotated a full 360 degrees back to its original heading — which is exactly what's needed before returning up to an even earlier parent call.

**Time complexity:** O(N) where N is the number of open cells — each cell is visited once, and each visit does O(1) work aside from the fixed 4-direction exploration (each of which is O(1) robot calls, with a bounded backtrack cost).

**Space complexity:** O(N) for the visited set and the recursion stack.
