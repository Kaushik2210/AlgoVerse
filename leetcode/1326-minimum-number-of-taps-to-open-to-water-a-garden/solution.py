from typing import List


class Solution:
    def minTaps(self, n: int, ranges: List[int]) -> int:
        farthest = [0] * (n + 1)
        for i, r in enumerate(ranges):
            start = max(0, i - r)
            end = min(n, i + r)
            farthest[start] = max(farthest[start], end)

        count = 0
        current_end = 0
        next_end = 0
        s = 0
        while current_end < n:
            while s <= current_end and s <= n:
                next_end = max(next_end, farthest[s])
                s += 1
            if next_end <= current_end:
                return -1
            count += 1
            current_end = next_end
        return count
