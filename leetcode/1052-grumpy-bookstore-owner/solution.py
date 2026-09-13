from typing import List


class Solution:
    def maxSatisfied(self, customers: List[int], grumpy: List[int], minutes: int) -> int:
        n = len(customers)
        base = sum(c for c, g in zip(customers, grumpy) if g == 0)

        extra = 0
        window = 0
        for i in range(n):
            if grumpy[i] == 1:
                window += customers[i]
            if i >= minutes and grumpy[i - minutes] == 1:
                window -= customers[i - minutes]
            extra = max(extra, window)

        return base + extra
