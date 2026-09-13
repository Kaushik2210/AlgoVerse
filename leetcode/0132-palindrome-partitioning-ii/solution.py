class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        is_palindrome = [[False] * n for _ in range(n)]

        for length in range(1, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                if s[i] == s[j] and (length <= 2 or is_palindrome[i + 1][j - 1]):
                    is_palindrome[i][j] = True

        dp = [0] * n
        for i in range(n):
            if is_palindrome[0][i]:
                dp[i] = 0
                continue

            dp[i] = i  # worst case: cut before every character
            for j in range(i):
                if is_palindrome[j + 1][i]:
                    dp[i] = min(dp[i], dp[j] + 1)

        return dp[n - 1]
