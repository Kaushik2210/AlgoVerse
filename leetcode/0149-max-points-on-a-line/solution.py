from math import gcd
from typing import List


class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        if n <= 2:
            return n

        best = 1

        for i in range(n):
            slopes = {}
            x1, y1 = points[i]
            for j in range(n):
                if j == i:
                    continue
                x2, y2 = points[j]
                dx, dy = x2 - x1, y2 - y1

                if dx == 0:
                    key = (0, 1)
                else:
                    g = gcd(dx, dy)
                    dx //= g
                    dy //= g
                    if dx < 0:
                        dx, dy = -dx, -dy
                    key = (dx, dy)

                slopes[key] = slopes.get(key, 0) + 1
                best = max(best, slopes[key] + 1)

        return best
