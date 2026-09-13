from typing import List


class Solution:
    def numSimilarGroups(self, strs: List[str]) -> int:
        n = len(strs)
        parent = list(range(n))

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int) -> None:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        def is_similar(a: str, b: str) -> bool:
            diff = 0
            for ca, cb in zip(a, b):
                if ca != cb:
                    diff += 1
                    if diff > 2:
                        return False
            return True

        for i in range(n):
            for j in range(i + 1, n):
                if find(i) != find(j) and is_similar(strs[i], strs[j]):
                    union(i, j)

        return sum(1 for i in range(n) if find(i) == i)
