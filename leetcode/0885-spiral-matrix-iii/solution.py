from typing import List


class Solution:
    def spiralMatrixIII(self, rows: int, cols: int, rStart: int, cStart: int) -> List[List[int]]:
        result = [[rStart, cStart]]
        r, c = rStart, cStart
        # directions cycle: east, south, west, north
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        step = 1
        d = 0
        while len(result) < rows * cols:
            for _ in range(2):
                dr, dc = directions[d]
                for _ in range(step):
                    r += dr
                    c += dc
                    if 0 <= r < rows and 0 <= c < cols:
                        result.append([r, c])
                        if len(result) == rows * cols:
                            return result
                d = (d + 1) % 4
            step += 1
        return result
