class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True

        for j in range(1, n + 1):
            if p[j - 1] == "*" and j >= 2:
                dp[0][j] = dp[0][j - 2]

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                pc = p[j - 1]
                if pc == "*":
                    # p[j-2] is guaranteed to exist per the problem's constraints.
                    zero_occurrence = dp[i][j - 2]
                    one_or_more = False
                    prev = p[j - 2]
                    if prev == "." or prev == s[i - 1]:
                        one_or_more = dp[i - 1][j]
                    dp[i][j] = zero_occurrence or one_or_more
                elif pc == "." or pc == s[i - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = False

        return dp[m][n]
