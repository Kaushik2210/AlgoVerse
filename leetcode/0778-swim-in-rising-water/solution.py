import heapq
from typing import List


class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        n = len(grid)
        visited = [[False] * n for _ in range(n)]
        # Priority queue of (max elevation encountered along the path so far, r, c).
        heap = [(grid[0][0], 0, 0)]
        visited[0][0] = True
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        while heap:
            time, r, c = heapq.heappop(heap)
            if r == n - 1 and c == n - 1:
                return time

            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and not visited[nr][nc]:
                    visited[nr][nc] = True
                    # The time to swim through this neighbor is bounded below
                    # by whichever is larger: the elevation already crossed
                    # to get here, or this cell's own elevation.
                    heapq.heappush(heap, (max(time, grid[nr][nc]), nr, nc))

        return -1
