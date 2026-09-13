from typing import List, Optional


class Solution:
    def findRedundantDirectedConnection(self, edges: List[List[int]]) -> List[int]:
        n = len(edges)
        node_parent = [0] * (n + 1)
        candidate1: Optional[List[int]] = None
        candidate2: Optional[List[int]] = None
        skip_index = -1

        for i, (u, v) in enumerate(edges):
            if node_parent[v] != 0:
                candidate1 = [node_parent[v], v]
                candidate2 = [u, v]
                skip_index = i
            else:
                node_parent[v] = u

        uf_parent = list(range(n + 1))

        def find(x: int) -> int:
            while uf_parent[x] != x:
                uf_parent[x] = uf_parent[uf_parent[x]]
                x = uf_parent[x]
            return x

        for i, (u, v) in enumerate(edges):
            if i == skip_index:
                continue
            ru, rv = find(u), find(v)
            if ru == rv:
                return candidate1 if candidate1 else [u, v]
            uf_parent[ru] = rv

        return candidate2
