from typing import List


class Solution:
    def numberOfBoomerangs(self, points: List[List[int]]) -> int:
        total = 0

        for x0, y0 in points:
            dist_count = {}
            for x1, y1 in points:
                d = (x1 - x0) ** 2 + (y1 - y0) ** 2
                dist_count[d] = dist_count.get(d, 0) + 1

            for count in dist_count.values():
                total += count * (count - 1)

        return total
