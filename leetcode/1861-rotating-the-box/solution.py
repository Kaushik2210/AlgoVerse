from typing import List


class Solution:
    def rotateTheBox(self, box: List[List[str]]) -> List[List[str]]:
        m, n = len(box), len(box[0])
        grid = [row[:] for row in box]

        # gravity pulls stones ('#') to the right in each row; obstacles
        # ('*') block them and act as new anchor points.
        for row in grid:
            write = n - 1
            for col in range(n - 1, -1, -1):
                if row[col] == '*':
                    write = col - 1
                elif row[col] == '#':
                    row[col] = '.'
                    row[write] = '#'
                    write -= 1

        # rotate 90 degrees clockwise: new[i][j] = old[m-1-j][i]
        rotated = [['.' for _ in range(m)] for _ in range(n)]
        for i in range(m):
            for j in range(n):
                rotated[j][m - 1 - i] = grid[i][j]
        return rotated
