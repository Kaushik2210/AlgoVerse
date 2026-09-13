from typing import List


class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        m, k = len(mat1), len(mat1[0])
        n = len(mat2[0])
        result = [[0] * n for _ in range(m)]

        for i in range(m):
            for x in range(k):
                val1 = mat1[i][x]
                if val1 == 0:
                    continue
                for j in range(n):
                    val2 = mat2[x][j]
                    if val2 != 0:
                        result[i][j] += val1 * val2

        return result
