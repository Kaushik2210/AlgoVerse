class Solution:
    def integerBreak(self, n: int) -> int:
        dp = [0] * (n + 1)
        for i in range(2, n + 1):
            best = 0
            for j in range(1, i):
                best = max(best, j * (i - j), j * dp[i - j])
            dp[i] = best
        return dp[n]
