class Solution:
    def getMoneyAmount(self, n: int) -> int:
        # dp[i][j] = minimum amount of money needed to guarantee a win
        # when the picked number is somewhere in [i, j].
        dp = [[0] * (n + 2) for _ in range(n + 2)]

        for length in range(2, n + 1):
            for i in range(1, n - length + 2):
                j = i + length - 1
                best = float('inf')
                for g in range(i, j + 1):
                    left = dp[i][g - 1] if g - 1 >= i else 0
                    right = dp[g + 1][j] if g + 1 <= j else 0
                    cost = g + max(left, right)
                    if cost < best:
                        best = cost
                dp[i][j] = best

        return dp[1][n]
