from typing import List


class Solution:
    def gameOfLife(self, board: List[List[int]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        rows, cols = len(board), len(board[0])

        def live_neighbors(r: int, c: int) -> int:
            count = 0
            for dr in (-1, 0, 1):
                for dc in (-1, 0, 1):
                    if dr == 0 and dc == 0:
                        continue
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < rows and 0 <= nc < cols:
                        count += board[nr][nc] & 1
            return count

        for r in range(rows):
            for c in range(cols):
                live = live_neighbors(r, c)
                old = board[r][c] & 1
                if old == 1 and live in (2, 3):
                    board[r][c] |= 2
                elif old == 0 and live == 3:
                    board[r][c] |= 2

        for r in range(rows):
            for c in range(cols):
                board[r][c] >>= 1
