# 841. Keys and Rooms

There are `n` rooms labeled `0` to `n - 1`, and all of them are locked except room `0`. Each room has a list of keys, `rooms[i]`, and each key opens exactly one other room. You start in room `0`. Return `true` if you can visit every room, `false` otherwise.

**Example 1:**
```
Input: rooms = [[1],[2],[3],[]]
Output: true
Explanation: Start in room 0, grab key 1, go to room 1, grab key 2, go to room 2, grab key 3, go to room 3.
```

**Example 2:**
```
Input: rooms = [[1,3],[3,0,1],[2],[0]]
Output: false
Explanation: Room 2 is never unlocked.
```

**Constraints:**
- n == rooms.length
- 2 <= n <= 1000
- 0 <= rooms[i].length <= 1000
- 0 <= rooms[i][j] < n
- All values of rooms[i] are unique

## Approach

Strip away the room-and-key story and this is just graph reachability again: treat each room as a node, and each key inside a room as a directed edge to the room it opens. Starting from room 0, can you reach every other node?

Do a DFS (or BFS) starting at room 0. Mark it visited, then for every key found inside, visit that room too if it hasn't been opened yet — collecting its keys in turn, and so on. This is exactly graph traversal; there's no need to simulate "carrying" keys around or worry about which key came from which room, because once a room is visited its keys are permanently available.

At the end, check whether the number of visited rooms equals `n`. If any room was never reached, it means no chain of keys starting from room 0 ever unlocks it, so the answer is `false`.

**Time complexity:** O(n + k) where k is the total number of keys across all rooms — each room is visited once and each key is looked at once.

**Space complexity:** O(n) for the visited set and recursion/queue.
