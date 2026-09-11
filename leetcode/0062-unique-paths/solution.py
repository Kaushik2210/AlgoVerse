class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # row[j] = number of ways to reach column j in the current row
        row = [1] * n

        for _ in range(1, m):
            for j in range(1, n):
                row[j] += row[j - 1]

        return row[-1]
