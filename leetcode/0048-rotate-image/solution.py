from typing import List


class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)

        # transpose in place: flip across the main diagonal
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

        # reverse each row: turns the transpose into a 90-degree clockwise rotation
        for row in matrix:
            row.reverse()
