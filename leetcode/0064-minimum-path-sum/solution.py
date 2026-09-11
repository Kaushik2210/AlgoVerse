from typing import List


class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        # row[j] = cheapest cost to reach column j in the current row
        row = [0] * cols
        row[0] = grid[0][0]
        for j in range(1, cols):
            row[j] = row[j - 1] + grid[0][j]

        for i in range(1, rows):
            row[0] += grid[i][0]
            for j in range(1, cols):
                row[j] = grid[i][j] + min(row[j], row[j - 1])

        return row[-1]
