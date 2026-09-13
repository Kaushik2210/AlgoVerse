# 1861. Rotating the Box

You're given an `m x n` grid representing a box viewed from the side, where `'#'` is a stone, `'*'` is a fixed obstacle, and `'.'` is empty. Gravity pulls every stone as far right as possible in its row (stopping at the box wall or the nearest obstacle/stone already there), and then the whole box is rotated 90 degrees clockwise. Return the grid after both the gravity settle and the rotation.

**Example 1:**
```
Input: box = [["#",".","#"]]
Output: [["."],["#"],["#"]]
```

**Example 2:**
```
Input: box = [["#",".","*","."],["#","#","*","."]]
Output: [["#","."],["#","#"],["*","*"],[".","."]]
```

**Constraints:**
- m == box.length
- n == box[i].length
- 1 <= m, n <= 500
- box[i][j] is '#', '*', or '.'

## Approach

Two separate, simple steps: settle the stones under gravity, then rotate.

Gravity acts row by row and always pushes stones to the right, so walk each row from right to left with a "next open slot" pointer starting at the last column. Whenever a `'#'` is seen, place it at the pointer position and clear the original cell, then move the pointer one to the left. Whenever a `'*'` is hit, it's immovable — the pointer resets to just left of it, since nothing can slide past an obstacle. This is a single right-to-left pass per row.

Rotating 90 degrees clockwise is just a coordinate transform: the element originally at `(i, j)` in an `m x n` grid ends up at `(j, m - 1 - i)` in the resulting `n x m` grid. Build the new grid by mapping every settled cell through that formula.

Doing gravity first and rotation second (rather than trying to rotate and then handle "gravity" as some sideways slide) keeps each step conceptually simple and easy to get right.

**Time complexity:** O(m * n) — one pass to settle stones, one pass to remap every cell into the rotated grid.

**Space complexity:** O(m * n) for the settled copy and the rotated output.
