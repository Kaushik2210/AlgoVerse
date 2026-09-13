from typing import List


class UnionFind:
    def __init__(self, size: int):
        self.parent = list(range(size))
        self.rank = [0] * size

    def find(self, x: int) -> int:
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]  # path compression
            x = self.parent[x]
        return x

    def union(self, a: int, b: int) -> bool:
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        if self.rank[ra] < self.rank[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        if self.rank[ra] == self.rank[rb]:
            self.rank[ra] += 1
        return True


class Solution:
    def numIslands2(self, m: int, n: int, positions: List[List[int]]) -> List[int]:
        uf = UnionFind(m * n)
        is_land = [[False] * n for _ in range(m)]
        island_count = 0
        result = []

        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        for r, c in positions:
            if is_land[r][c]:
                # re-adding the same cell doesn't change anything
                result.append(island_count)
                continue

            is_land[r][c] = True
            island_count += 1  # this cell starts as its own new island

            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and is_land[nr][nc]:
                    if uf.union(r * n + c, nr * n + nc):
                        island_count -= 1  # merging two distinct islands into one

            result.append(island_count)

        return result
