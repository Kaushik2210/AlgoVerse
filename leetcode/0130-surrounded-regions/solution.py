from typing import List


class Solution:
    def solve(self, board: List[List[str]]) -> None:
        if not board or not board[0]:
            return

        rows, cols = len(board), len(board[0])

        def flood(r: int, c: int) -> None:
            stack = [(r, c)]
            board[r][c] = '#'
            while stack:
                cr, cc = stack.pop()
                for nr, nc in ((cr + 1, cc), (cr - 1, cc), (cr, cc + 1), (cr, cc - 1)):
                    if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] == 'O':
                        board[nr][nc] = '#'
                        stack.append((nr, nc))

        for r in range(rows):
            for c in (0, cols - 1):
                if board[r][c] == 'O':
                    flood(r, c)

        for c in range(cols):
            for r in (0, rows - 1):
                if board[r][c] == 'O':
                    flood(r, c)

        for r in range(rows):
            for c in range(cols):
                if board[r][c] == 'O':
                    board[r][c] = 'X'
                elif board[r][c] == '#':
                    board[r][c] = 'O'
