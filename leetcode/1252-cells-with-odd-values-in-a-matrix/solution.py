from typing import List


class Solution:
    def oddCells(self, m: int, n: int, indices: List[List[int]]) -> int:
        # a cell's final value's parity only depends on how many times its
        # row was incremented plus how many times its column was incremented,
        # so just count increments per row and per column instead of
        # actually building the m x n grid.
        row_count = [0] * m
        col_count = [0] * n
        for r, c in indices:
            row_count[r] += 1
            col_count[c] += 1

        odd_rows = sum(1 for x in row_count if x % 2 == 1)
        odd_cols = sum(1 for x in col_count if x % 2 == 1)
        even_rows = m - odd_rows
        even_cols = n - odd_cols

        # a cell (i, j) is odd iff exactly one of row_count[i], col_count[j] is odd
        return odd_rows * even_cols + even_rows * odd_cols
