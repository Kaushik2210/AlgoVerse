import heapq
from typing import List


class Solution:
    def maximumMinimumPath(self, grid: List[List[int]]) -> int:
        rows, cols = len(grid), len(grid[0])

        # max-heap (via negation) of (path_bottleneck_so_far, row, col): always expand
        # from the currently-best-known path first, Dijkstra-style but maximizing
        # the minimum edge weight along the path instead of minimizing a sum
        heap = [(-grid[0][0], 0, 0)]
        visited = [[False] * cols for _ in range(rows)]
        visited[0][0] = True

        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        while heap:
            neg_score, r, c = heapq.heappop(heap)
            score = -neg_score
            if r == rows - 1 and c == cols - 1:
                return score

            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and not visited[nr][nc]:
                    visited[nr][nc] = True
                    new_score = min(score, grid[nr][nc])
                    heapq.heappush(heap, (-new_score, nr, nc))

        return -1  # unreachable (shouldn't happen on a full grid)
