class Solution:
    def totalNQueens(self, n: int) -> int:
        self.count = 0
        used_cols = set()
        used_diag1 = set()  # row - col
        used_diag2 = set()  # row + col

        def backtrack(row: int) -> None:
            if row == n:
                self.count += 1
                return

            for col in range(n):
                if col in used_cols or (row - col) in used_diag1 or (row + col) in used_diag2:
                    continue

                used_cols.add(col)
                used_diag1.add(row - col)
                used_diag2.add(row + col)

                backtrack(row + 1)

                used_cols.remove(col)
                used_diag1.remove(row - col)
                used_diag2.remove(row + col)

        backtrack(0)
        return self.count
