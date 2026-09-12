class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        m, n = len(s1), len(s2)
        if m + n != len(s3):
            return False

        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True

        for i in range(m + 1):
            for j in range(n + 1):
                if i == 0 and j == 0:
                    continue
                from_s1 = i > 0 and s1[i - 1] == s3[i + j - 1] and dp[i - 1][j]
                from_s2 = j > 0 and s2[j - 1] == s3[i + j - 1] and dp[i][j - 1]
                dp[i][j] = from_s1 or from_s2

        return dp[m][n]
