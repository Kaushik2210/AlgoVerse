# 803. Bricks Falling When Hit

You're given an `m x n` binary grid `grid` where `1` means a brick and `0` means empty. A brick is "stable" if it's in row 0, or if it's 4-directionally adjacent to a stable brick. You're also given `hits`, a list of `[row, col]` cells to knock out in order. When a cell is hit: if there's a brick there, it's erased (whether or not it was stable); then, any brick that becomes unstable as a result *immediately falls* and is also erased, chain-reacting through whatever else that destabilizes. Return an array where `result[i]` is the number of bricks that fell (not counting the hit brick itself) as a direct or indirect result of the `i`-th hit. A hit on an empty cell contributes 0 and doesn't otherwise affect anything.

**Example 1:**
```
Input: grid = [[1,0,0,0],[1,1,1,0]], hits = [[1,0]]
Output: [2]
Explanation: hitting (1,0) removes it. The bricks at (1,1) and (1,2) were only connected to row 0 through (1,0)->(0,0), so once (1,0) is gone they're no longer connected to the roof and both fall.
```

**Example 2:**
```
Input: grid = [[1,0,0,0],[1,1,0,0]], hits = [[1,1],[1,0]]
Output: [0,0]
Explanation: hitting (1,1) removes it — nothing else depended on it, so 0 fall. Hitting (1,0) then removes it too, but nothing remains attached to it, so 0 fall there as well.
```

**Constraints:**
- m == grid.length, n == grid[i].length
- 1 <= m, n <= 200
- grid[i][j] is 0 or 1
- 1 <= hits.length <= 4 * 10^4
- hits[i].length == 2

## Approach

Simulating hits forward — removing a brick, then flood-filling to find everything that just got disconnected from row 0 — is correct but requires a fresh traversal after each hit, which is too slow for up to 4*10^4 hits.

The trick that makes this tractable is to **run the whole process in reverse**, turning "chasing what falls apart" into "watching what reconnects" — and reconnection is exactly what union-find is built for efficiently.

1. First compute what the grid looks like after *all* hits have already been applied (every hit cell zeroed out, ignoring order for now) — this is the final, fully-demolished state.
2. Build a union-find over that final state: every remaining brick gets unioned with its brick neighbors, and every brick in row 0 gets unioned with a virtual "roof" node representing guaranteed stability. This union-find now correctly reflects "who is connected to the roof" in the end state.
3. Walk the hits **backward**, from the last hit to the first, and instead of removing bricks, *add them back* one at a time — undoing demolition in reverse chronological order. For each hit `(r, c)` (skipping any hit where the original grid had no brick there — those contribute 0 and never affect anything):
   - Record the current size of the roof's connected component.
   - Place the brick back into the working grid, union it with any of its now-present brick neighbors, and union it with the roof directly if `r == 0`.
   - Record the roof's connected component size again.
   - The increase in size, **minus 1** (to exclude the brick just placed, which doesn't count as having "fallen"), is exactly how many bricks would have fallen at that hit when time ran forward — because adding this brick back is precisely undoing the forward hit, and whatever *newly* joins the roof's component at this moment is exactly what depended on this brick (directly or transitively) to stay connected.

Since hits are processed in reverse, `result[i]` computed while undoing hit `i` is stored directly at index `i` — no re-reversal of the result mapping is needed, only the walk order is reversed.

**Time complexity:** O(m*n + h * α(m*n)) where h is the number of hits — building the initial union-find is O(m*n), and each of the h reverse-hits does O(1) neighbor checks with near-O(1) amortized union-find operations.

**Space complexity:** O(m*n) for the union-find arrays and the working grid.
