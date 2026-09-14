from typing import List


class Solution:
    def isBoomerang(self, points: List[List[int]]) -> bool:
        (x0, y0), (x1, y1), (x2, y2) = points
        cross = (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0)
        return cross != 0
