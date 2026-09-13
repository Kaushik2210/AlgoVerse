# 289. Game of Life

Given an `m x n` board where each cell is `1` (live) or `0` (dead), compute the next state according to Conway's rules, applied simultaneously to every cell: a live cell with fewer than 2 or more than 3 live neighbors dies; a live cell with 2 or 3 live neighbors survives; a dead cell with exactly 3 live neighbors becomes alive. Update the board in place.

**Example 1:**
```
Input: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
```

**Example 2:**
```
Input: board = [[1,1],[1,0]]
Output: [[1,1],[1,1]]
```

**Constraints:**
- board values are 0 or 1

## Follow-up: in-place, O(1) extra space

The naive approach copies the whole board first, then computes each cell's next state by reading only the (untouched) copy and writing into the original — that's correct but uses O(m*n) extra space for the copy. Since the rules require reading each cell's *original* state (not any already-updated neighbor), overwriting the board in a single pass looks dangerous... unless there's a way to keep the original information around inside the same cell.

The trick is to encode both the old and new state in the same integer using a second bit, since the values only ever need to represent 4 possibilities (old-state x new-state). While scanning, for each cell count live neighbors using only the low bit (`cell & 1`), which always reflects the original state regardless of what's been written into the second bit so far. Then encode the result as:

- `0` -> stays dead (both bits 0)
- `1` -> was alive, stays alive (low bit 1, high bit 1 -> value `3`... but simpler: just set bit 1 if the *new* state is alive)
- Set the second bit (`| 2`) whenever the next state is alive, regardless of whether the low bit (old state) was 0 or 1.

So each cell ends the first pass holding `oldState | (newState << 1)`, meaning values are one of `0` (dead->dead), `1` (alive->dead), `2` (dead->alive), `3` (alive->alive). Reading `cell & 1` during the pass always still gives the correct original state for neighbor counting, since that bit is never touched. A second, final pass just right-shifts every cell by 1 (`cell >>= 1`) to collapse it down to the new state alone.

**Time complexity:** O(m*n) — two passes over the board.

**Space complexity:** O(1) — extra state is packed into the existing cells instead of a separate copy.
