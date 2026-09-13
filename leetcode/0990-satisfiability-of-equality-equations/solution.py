from typing import List


class UnionFind:
    def __init__(self, size: int):
        self.parent = list(range(size))

    def find(self, x: int) -> int:
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, a: int, b: int) -> None:
        ra, rb = self.find(a), self.find(b)
        if ra != rb:
            self.parent[ra] = rb


class Solution:
    def equationsPossible(self, equations: List[str]) -> bool:
        uf = UnionFind(26)  # one slot per lowercase letter

        def var(ch: str) -> int:
            return ord(ch) - ord("a")

        # process every "==" equation first, grouping variables claimed equal
        for eq in equations:
            if eq[1] == "=":
                uf.union(var(eq[0]), var(eq[3]))

        # then check every "!=" equation doesn't contradict a grouping we just built
        for eq in equations:
            if eq[1] == "!":
                if uf.find(var(eq[0])) == uf.find(var(eq[3])):
                    return False

        return True
