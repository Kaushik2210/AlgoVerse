from typing import List


class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        matrix = [[0] * n for _ in range(n)]
        top, bottom, left, right = 0, n - 1, 0, n - 1
        num = 1

        while top <= bottom and left <= right:
            for c in range(left, right + 1):
                matrix[top][c] = num
                num += 1
            top += 1

            for r in range(top, bottom + 1):
                matrix[r][right] = num
                num += 1
            right -= 1

            if top <= bottom:
                for c in range(right, left - 1, -1):
                    matrix[bottom][c] = num
                    num += 1
                bottom -= 1

            if left <= right:
                for r in range(bottom, top - 1, -1):
                    matrix[r][left] = num
                    num += 1
                left += 1

        return matrix
