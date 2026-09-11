# 48. Rotate Image

You're given an `n x n` 2D matrix representing an image. Rotate it 90 degrees clockwise, in place — you can't allocate another 2D matrix to do the rotation.

**Example 1:**
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
```

**Example 2:**
```
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
```

**Constraints:**
- n == matrix.length == matrix[i].length
- 1 <= n <= 20

## Approach

You could work out the direct index mapping for a 90-degree rotation and swap 4 cells at a time layer by layer, but that's fiddly to get right. There's a cleaner two-step trick that avoids juggling four indices at once: a 90-degree clockwise rotation is the same thing as transposing the matrix and then reversing each row.

Transposing means flipping the matrix across its main diagonal — swap `matrix[i][j]` with `matrix[j][i]` for every pair above the diagonal (only go through `j > i` so you don't swap each pair back). That alone gives you a counter-clockwise-ish mirror image. Then reverse every row left-to-right, and what falls out is exactly the clockwise rotation. It's easiest to just trust the composition and verify on a small example — transpose then row-reverse reliably produces a 90-degree clockwise turn.

Both steps work entirely in place: the transpose only swaps pairs of cells, and reversing a row is a two-pointer swap from both ends inward, so no extra matrix is ever needed.

**Time complexity:** O(n^2) — every cell is touched a constant number of times.

**Space complexity:** O(1) — everything happens in place on the input matrix.
