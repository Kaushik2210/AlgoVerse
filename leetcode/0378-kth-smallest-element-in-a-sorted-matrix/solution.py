from typing import List


class Solution:
    def kthSmallest(self, matrix: List[List[int]], k: int) -> int:
        n = len(matrix)

        def count_less_equal(mid: int) -> int:
            count = 0
            row, col = n - 1, 0
            while row >= 0 and col < n:
                if matrix[row][col] <= mid:
                    count += row + 1
                    col += 1
                else:
                    row -= 1
            return count

        lo, hi = matrix[0][0], matrix[n - 1][n - 1]
        while lo < hi:
            mid = (lo + hi) // 2
            if count_less_equal(mid) < k:
                lo = mid + 1
            else:
                hi = mid
        return lo
