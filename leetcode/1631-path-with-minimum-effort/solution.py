import heapq
from typing import List


class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        rows, cols = len(heights), len(heights[0])
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        # min-heap Dijkstra where the "distance" to a cell is the largest single
        # step (absolute height difference) along the best path found to it so far
        effort_to = [[float("inf")] * cols for _ in range(rows)]
        effort_to[0][0] = 0
        heap = [(0, 0, 0)]

        while heap:
            effort, r, c = heapq.heappop(heap)
            if r == rows - 1 and c == cols - 1:
                return effort
            if effort > effort_to[r][c]:
                continue  # stale heap entry, a better path to (r, c) was already found

            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols:
                    step = abs(heights[nr][nc] - heights[r][c])
                    new_effort = max(effort, step)
                    if new_effort < effort_to[nr][nc]:
                        effort_to[nr][nc] = new_effort
                        heapq.heappush(heap, (new_effort, nr, nc))

        return 0  # unreachable in practice (1x1 grid handled by the initial pop)
