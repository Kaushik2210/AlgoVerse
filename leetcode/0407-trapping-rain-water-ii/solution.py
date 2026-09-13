import heapq
from typing import List


class Solution:
    def trapRainWater(self, heightMap: List[List[int]]) -> int:
        if not heightMap or not heightMap[0]:
            return 0

        m, n = len(heightMap), len(heightMap[0])
        if m < 3 or n < 3:
            return 0

        visited = [[False] * n for _ in range(m)]
        heap = []

        # Seed the heap with every border cell - water can never be trapped
        # there since it has nowhere to hold it in (it's the edge of the map),
        # but the border also forms the initial "wall" that bounds every
        # interior cell.
        for r in range(m):
            for c in range(n):
                if r == 0 or r == m - 1 or c == 0 or c == n - 1:
                    heapq.heappush(heap, (heightMap[r][c], r, c))
                    visited[r][c] = True

        total_water = 0
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        while heap:
            height, r, c = heapq.heappop(heap)
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
                    visited[nr][nc] = True
                    # Water level at this neighbor is bounded by the lowest
                    # wall encountered on the boundary expanded so far.
                    total_water += max(0, height - heightMap[nr][nc])
                    heapq.heappush(heap, (max(height, heightMap[nr][nc]), nr, nc))

        return total_water
