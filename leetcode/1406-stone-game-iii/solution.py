from typing import List


class Solution:
    def stoneGameIII(self, stoneValue: List[int]) -> str:
        n = len(stoneValue)
        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            best = float('-inf')
            take = 0
            for x in range(1, 4):
                if i + x > n:
                    break
                take += stoneValue[i + x - 1]
                best = max(best, take - dp[i + x])
            dp[i] = best

        if dp[0] > 0:
            return "Alice"
        elif dp[0] < 0:
            return "Bob"
        return "Tie"
