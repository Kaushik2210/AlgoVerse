from typing import List


class Solution:
    def maxCoins(self, nums: List[int]) -> int:
        balloons = [1] + nums + [1]
        n = len(balloons)
        dp = [[0] * n for _ in range(n)]

        for length in range(2, n):
            for i in range(0, n - length):
                j = i + length
                best = 0
                for k in range(i + 1, j):
                    coins = (
                        dp[i][k]
                        + dp[k][j]
                        + balloons[i] * balloons[k] * balloons[j]
                    )
                    best = max(best, coins)
                dp[i][j] = best

        return dp[0][n - 1]
