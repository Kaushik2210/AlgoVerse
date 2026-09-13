from typing import List


class Solution:
    def minFallingPathSum(self, matrix: List[List[int]]) -> int:
        n = len(matrix)
        prev = matrix[0][:]

        for i in range(1, n):
            curr = [0] * n
            for j in range(n):
                best = prev[j]
                if j > 0:
                    best = min(best, prev[j - 1])
                if j < n - 1:
                    best = min(best, prev[j + 1])
                curr[j] = matrix[i][j] + best
            prev = curr

        return min(prev)
