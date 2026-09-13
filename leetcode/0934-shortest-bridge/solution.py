from collections import deque
from typing import List


class Solution:
    def shortestBridge(self, grid: List[List[int]]) -> int:
        n = len(grid)
        visited = [[False] * n for _ in range(n)]

        def find_first_island():
            for r in range(n):
                for c in range(n):
                    if grid[r][c] == 1:
                        return r, c
            return -1, -1

        sr, sc = find_first_island()
        stack = [(sr, sc)]
        visited[sr][sc] = True
        queue = deque()
        queue.append((sr, sc, 0))

        while stack:
            r, c = stack.pop()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and not visited[nr][nc] and grid[nr][nc] == 1:
                    visited[nr][nc] = True
                    stack.append((nr, nc))
                    queue.append((nr, nc, 0))

        while queue:
            r, c, dist = queue.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and not visited[nr][nc]:
                    if grid[nr][nc] == 1:
                        return dist
                    visited[nr][nc] = True
                    queue.append((nr, nc, dist + 1))

        return -1
