from typing import List


class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        result = []
        col_placement = [-1] * n  # col_placement[row] = column of the queen in that row
        used_cols = set()
        used_diag1 = set()  # row - col
        used_diag2 = set()  # row + col

        def backtrack(row: int) -> None:
            if row == n:
                board = []
                for r in range(n):
                    line = ['.'] * n
                    line[col_placement[r]] = 'Q'
                    board.append(''.join(line))
                result.append(board)
                return

            for col in range(n):
                if col in used_cols or (row - col) in used_diag1 or (row + col) in used_diag2:
                    continue

                col_placement[row] = col
                used_cols.add(col)
                used_diag1.add(row - col)
                used_diag2.add(row + col)

                backtrack(row + 1)

                used_cols.remove(col)
                used_diag1.remove(row - col)
                used_diag2.remove(row + col)

        backtrack(0)
        return result
