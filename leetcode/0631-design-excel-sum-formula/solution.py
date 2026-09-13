from typing import List


class Excel:
    def __init__(self, height: int, width: str):
        w = ord(width) - ord('A') + 1
        # mat[row][col] holds the raw value; row is 1-indexed, col is 0-indexed (A=0)
        self.mat = [[0] * w for _ in range(height + 1)]
        # formulas[(row, col)] = list of (row, col) cells whose values get summed together
        self.formulas = {}

    def _parse_cell(self, s: str):
        col = ord(s[0]) - ord('A')
        row = int(s[1:])
        return row, col

    def _parse_numbers(self, numbers: List[str]):
        cells = []
        for token in numbers:
            if ':' in token:
                top_left, bottom_right = token.split(':')
                r1, c1 = self._parse_cell(top_left)
                r2, c2 = self._parse_cell(bottom_right)
                for r in range(r1, r2 + 1):
                    for c in range(c1, c2 + 1):
                        cells.append((r, c))
            else:
                cells.append(self._parse_cell(token))
        return cells

    def set(self, row: int, column: str, val: int) -> None:
        col = ord(column) - ord('A')
        # a plain set overwrites and cancels any formula this cell used to carry
        self.formulas.pop((row, col), None)
        self.mat[row][col] = val

    def get(self, row: int, column: str) -> int:
        col = ord(column) - ord('A')
        return self._get(row, col)

    def _get(self, row: int, col: int) -> int:
        # recompute from scratch every time, following formula chains as they go
        if (row, col) in self.formulas:
            return sum(self._get(r, c) for r, c in self.formulas[(row, col)])
        return self.mat[row][col]

    def sum(self, row: int, column: str, numbers: List[str]) -> int:
        col = ord(column) - ord('A')
        cells = self._parse_numbers(numbers)
        self.formulas[(row, col)] = cells
        return self._get(row, col)


# Your Excel object will be instantiated and called as such:
# obj = Excel(height, width)
# obj.set(row,column,val)
# param_2 = obj.get(row,column)
# param_3 = obj.sum(row,column,numbers)
