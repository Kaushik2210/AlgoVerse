from typing import List


class Solution:
    def uniquePathsIII(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        start = end = None
        empty_count = 0

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1:
                    start = (r, c)
                elif grid[r][c] == 2:
                    end = (r, c)
                elif grid[r][c] == 0:
                    empty_count += 1

        self.paths = 0

        def dfs(r, c, remaining):
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == -1:
                return
            if grid[r][c] == 2:
                if remaining == 0:
                    self.paths += 1
                return

            original = grid[r][c]
            grid[r][c] = -1  # mark visited
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                dfs(r + dr, c + dc, remaining - 1)
            grid[r][c] = original  # backtrack

        # remaining counts squares still to walk onto: all empty squares plus the end square
        dfs(start[0], start[1], empty_count + 1)
        return self.paths
