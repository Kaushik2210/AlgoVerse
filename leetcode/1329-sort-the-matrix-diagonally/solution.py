from typing import List
from collections import defaultdict


class Solution:
    def diagonalSort(self, mat: List[List[int]]) -> List[List[int]]:
        m, n = len(mat), len(mat[0])
        diagonals = defaultdict(list)

        for i in range(m):
            for j in range(n):
                diagonals[i - j].append(mat[i][j])

        for key in diagonals:
            diagonals[key].sort(reverse=True)  # pop() from the end gives ascending order

        for i in range(m):
            for j in range(n):
                mat[i][j] = diagonals[i - j].pop()

        return mat
