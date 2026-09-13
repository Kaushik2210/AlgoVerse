import heapq
from typing import List


class Solution:
    def connectSticks(self, sticks: List[int]) -> int:
        heapq.heapify(sticks)
        total = 0
        while len(sticks) > 1:
            a = heapq.heappop(sticks)
            b = heapq.heappop(sticks)
            cost = a + b
            total += cost
            heapq.heappush(sticks, cost)
        return total
