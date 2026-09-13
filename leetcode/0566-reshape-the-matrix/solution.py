from typing import List


class Solution:
    def matrixReshape(self, mat: List[List[int]], r: int, c: int) -> List[List[int]]:
        m, n = len(mat), len(mat[0])
        if r * c != m * n:
            return mat

        result = [[0] * c for _ in range(r)]
        for k in range(m * n):
            result[k // c][k % c] = mat[k // n][k % n]

        return result
