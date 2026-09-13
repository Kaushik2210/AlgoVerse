from typing import List


class Solution:
    def numDistinctIslands(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])
        visited = [[False] * cols for _ in range(rows)]
        shapes = set()

        def flood_fill(sr: int, sc: int):
            offsets = []
            stack = [(sr, sc)]
            visited[sr][sc] = True
            while stack:
                r, c = stack.pop()
                offsets.append((r - sr, c - sc))
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = r + dr, c + dc
                    if (0 <= nr < rows and 0 <= nc < cols
                            and grid[nr][nc] == 1 and not visited[nr][nc]):
                        visited[nr][nc] = True
                        stack.append((nr, nc))
            return tuple(sorted(offsets))

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1 and not visited[r][c]:
                    shapes.add(flood_fill(r, c))

        return len(shapes)
