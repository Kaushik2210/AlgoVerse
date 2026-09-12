from typing import List


class Solution:
    def canReach(self, arr: List[int], start: int) -> bool:
        n = len(arr)
        visited = [False] * n

        def dfs(i: int) -> bool:
            if i < 0 or i >= n or visited[i]:
                return False
            if arr[i] == 0:
                return True
            visited[i] = True
            return dfs(i + arr[i]) or dfs(i - arr[i])

        return dfs(start)
