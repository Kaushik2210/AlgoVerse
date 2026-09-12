from typing import List


class Solution:
    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:
        target = len(graph) - 1
        results = []
        path = [0]

        def dfs(node: int) -> None:
            if node == target:
                results.append(path[:])
                return
            for neighbor in graph[node]:
                path.append(neighbor)
                dfs(neighbor)
                path.pop()

        dfs(0)
        return results
