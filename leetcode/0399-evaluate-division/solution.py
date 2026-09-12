from collections import defaultdict
from typing import List


class Solution:
    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
        graph = defaultdict(list)
        for (a, b), value in zip(equations, values):
            graph[a].append((b, value))
            graph[b].append((a, 1.0 / value))

        def dfs(node: str, target: str, product: float, visited: set) -> float:
            if node not in graph:
                return -1.0
            if node == target:
                return product
            visited.add(node)
            for neighbor, weight in graph[node]:
                if neighbor not in visited:
                    result = dfs(neighbor, target, product * weight, visited)
                    if result != -1.0:
                        return result
            return -1.0

        results = []
        for c, d in queries:
            if c not in graph or d not in graph:
                results.append(-1.0)
            else:
                results.append(dfs(c, d, 1.0, set()))
        return results
