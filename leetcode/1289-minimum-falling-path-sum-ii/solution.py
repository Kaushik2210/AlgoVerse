from typing import List


class Solution:
    def minFallingPathSum(self, grid: List[List[int]]) -> int:
        n = len(grid)
        prev = grid[0][:]

        for i in range(1, n):
            # find the smallest and second smallest value in prev, along
            # with which column the smallest came from, so any cell in the
            # current row can grab a valid different-column predecessor in O(1)
            min1_val = min2_val = float('inf')
            min1_col = -1
            for j in range(n):
                if prev[j] < min1_val:
                    min2_val = min1_val
                    min1_val, min1_col = prev[j], j
                elif prev[j] < min2_val:
                    min2_val = prev[j]

            curr = [0] * n
            for j in range(n):
                best = min2_val if j == min1_col else min1_val
                curr[j] = grid[i][j] + best
            prev = curr

        return min(prev)
