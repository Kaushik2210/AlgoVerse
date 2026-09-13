from typing import List


class UnionFind:
    def __init__(self, size: int):
        self.parent = list(range(size))
        self.size = [1] * size

    def find(self, x: int) -> int:
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, a: int, b: int) -> None:
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return
        # attach the smaller tree under the larger one, roll its size up
        if self.size[ra] < self.size[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        self.size[ra] += self.size[rb]

    def component_size(self, x: int) -> int:
        return self.size[self.find(x)]


class Solution:
    def hitBricks(self, grid: List[List[int]], hits: List[List[int]]) -> List[int]:
        rows, cols = len(grid), len(grid[0])
        roof = rows * cols  # virtual node representing "connected to the ceiling / row 0"

        def idx(r: int, c: int) -> int:
            return r * cols + c

        # step 1: compute the grid's final state after ALL hits have been applied
        final_grid = [row[:] for row in grid]
        for r, c in hits:
            final_grid[r][c] = 0

        # step 2: build union-find on that final state (the state after every hit)
        uf = UnionFind(rows * cols + 1)
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        for r in range(rows):
            for c in range(cols):
                if final_grid[r][c] == 1:
                    if r == 0:
                        uf.union(idx(r, c), roof)
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < rows and 0 <= nc < cols and final_grid[nr][nc] == 1:
                            uf.union(idx(r, c), idx(nr, nc))

        # step 3: replay the hits in REVERSE, adding bricks back one at a time.
        # whatever newly becomes connected to the roof at each step is exactly
        # what would have fallen at that hit when time ran forward.
        result = [0] * len(hits)
        for i in range(len(hits) - 1, -1, -1):
            r, c = hits[i]
            if grid[r][c] == 0:
                continue  # there was never a brick here, nothing to report

            before = uf.component_size(roof)

            final_grid[r][c] = 1
            if r == 0:
                uf.union(idx(r, c), roof)
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and final_grid[nr][nc] == 1:
                    uf.union(idx(r, c), idx(nr, nc))

            after = uf.component_size(roof)

            # subtract 1 for the brick we just placed back itself, it doesn't count as "fallen"
            fallen = after - before - 1
            result[i] = max(0, fallen)

        return result
