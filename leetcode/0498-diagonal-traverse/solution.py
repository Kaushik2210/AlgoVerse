from typing import List


class Solution:
    def findDiagonalOrder(self, mat: List[List[int]]) -> List[int]:
        m, n = len(mat), len(mat[0])
        result = []

        for d in range(m + n - 1):
            r_lo = max(0, d - (n - 1))
            r_hi = min(d, m - 1)
            rows = range(r_lo, r_hi + 1)
            if d % 2 == 0:
                rows = reversed(rows)
            for r in rows:
                c = d - r
                result.append(mat[r][c])

        return result
