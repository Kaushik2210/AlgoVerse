from typing import List


class Solution:
    def loudAndRich(self, richer: List[List[int]], quiet: List[int]) -> List[int]:
        n = len(quiet)
        graph = [[] for _ in range(n)]
        for a, b in richer:
            graph[b].append(a)  # b is poorer than a, so explore from b towards richer a

        memo = [-1] * n

        def quietest(x: int) -> int:
            if memo[x] != -1:
                return memo[x]

            best = x
            for y in graph[x]:
                candidate = quietest(y)
                if quiet[candidate] < quiet[best]:
                    best = candidate

            memo[x] = best
            return best

        return [quietest(x) for x in range(n)]
