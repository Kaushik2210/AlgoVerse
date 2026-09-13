from typing import List


class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        row = [1] * (rowIndex + 1)
        for j in range(1, rowIndex + 1):
            row[j] = row[j - 1] * (rowIndex - j + 1) // j
        return row
