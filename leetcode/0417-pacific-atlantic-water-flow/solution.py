from typing import List


class Solution:
    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        if not heights or not heights[0]:
            return []

        rows, cols = len(heights), len(heights[0])

        def bfs(starts):
            reachable = [[False] * cols for _ in range(rows)]
            stack = list(starts)
            for r, c in starts:
                reachable[r][c] = True

            while stack:
                r, c = stack.pop()
                for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                    if (0 <= nr < rows and 0 <= nc < cols and not reachable[nr][nc]
                            and heights[nr][nc] >= heights[r][c]):
                        reachable[nr][nc] = True
                        stack.append((nr, nc))

            return reachable

        pacific_starts = [(0, c) for c in range(cols)] + [(r, 0) for r in range(rows)]
        atlantic_starts = [(rows - 1, c) for c in range(cols)] + [(r, cols - 1) for r in range(rows)]

        pacific = bfs(pacific_starts)
        atlantic = bfs(atlantic_starts)

        result = []
        for r in range(rows):
            for c in range(cols):
                if pacific[r][c] and atlantic[r][c]:
                    result.append([r, c])

        return result
