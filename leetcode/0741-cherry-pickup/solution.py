from typing import List

NEG = float("-inf")


class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        n = len(grid)

        # dp[r1][r2] = best total cherries for two paths both having taken
        # t steps, currently at rows r1 and r2 (columns are t - r1, t - r2).
        dp = [[NEG] * n for _ in range(n)]
        dp[0][0] = grid[0][0]

        for t in range(1, 2 * n - 1):
            new_dp = [[NEG] * n for _ in range(n)]
            lo_r1 = max(0, t - n + 1)
            hi_r1 = min(n - 1, t)
            for r1 in range(lo_r1, hi_r1 + 1):
                c1 = t - r1
                if c1 < 0 or c1 >= n or grid[r1][c1] == -1:
                    continue
                lo_r2 = max(0, t - n + 1)
                hi_r2 = min(n - 1, t)
                for r2 in range(lo_r2, hi_r2 + 1):
                    c2 = t - r2
                    if c2 < 0 or c2 >= n or grid[r2][c2] == -1:
                        continue

                    best = NEG
                    for pr1 in (r1 - 1, r1):
                        for pr2 in (r2 - 1, r2):
                            if pr1 < 0 or pr2 < 0:
                                continue
                            if dp[pr1][pr2] > best:
                                best = dp[pr1][pr2]

                    if best == NEG:
                        continue

                    value = grid[r1][c1]
                    if r1 != r2:
                        value += grid[r2][c2]
                    new_dp[r1][r2] = best + value

            dp = new_dp

        result = dp[n - 1][n - 1]
        return max(result, 0)
