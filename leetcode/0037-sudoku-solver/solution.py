from typing import List


class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        rows = [set() for _ in range(9)]
        cols = [set() for _ in range(9)]
        boxes = [set() for _ in range(9)]
        empties = []

        for r in range(9):
            for c in range(9):
                val = board[r][c]
                if val == ".":
                    empties.append((r, c))
                else:
                    b = (r // 3) * 3 + c // 3
                    rows[r].add(val)
                    cols[c].add(val)
                    boxes[b].add(val)

        def backtrack(idx: int) -> bool:
            if idx == len(empties):
                return True

            r, c = empties[idx]
            b = (r // 3) * 3 + c // 3

            for digit in "123456789":
                if digit in rows[r] or digit in cols[c] or digit in boxes[b]:
                    continue

                board[r][c] = digit
                rows[r].add(digit)
                cols[c].add(digit)
                boxes[b].add(digit)

                if backtrack(idx + 1):
                    return True

                board[r][c] = "."
                rows[r].discard(digit)
                cols[c].discard(digit)
                boxes[b].discard(digit)

            return False

        backtrack(0)
