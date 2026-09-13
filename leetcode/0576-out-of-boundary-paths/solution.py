class Solution:
    def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:
        MOD = 10 ** 9 + 7

        # dp[r][c] = number of ways to be standing at (r, c) with the moves made so far.
        dp = [[0] * n for _ in range(m)]
        dp[startRow][startColumn] = 1

        total_paths = 0
        directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        for _ in range(maxMove):
            new_dp = [[0] * n for _ in range(m)]
            for r in range(m):
                for c in range(n):
                    ways = dp[r][c]
                    if ways == 0:
                        continue
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < m and 0 <= nc < n:
                            new_dp[nr][nc] = (new_dp[nr][nc] + ways) % MOD
                        else:
                            total_paths = (total_paths + ways) % MOD
            dp = new_dp

        return total_paths % MOD
