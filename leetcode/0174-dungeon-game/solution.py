from typing import List


class Solution:
    def calculateMinimumHP(self, dungeon: List[List[int]]) -> int:
        m, n = len(dungeon), len(dungeon[0])
        dp = [[0] * n for _ in range(m)]

        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if i == m - 1 and j == n - 1:
                    need = 1 - dungeon[i][j]
                elif i == m - 1:
                    need = dp[i][j + 1] - dungeon[i][j]
                elif j == n - 1:
                    need = dp[i + 1][j] - dungeon[i][j]
                else:
                    need = min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j]

                dp[i][j] = max(1, need)

        return dp[0][0]
