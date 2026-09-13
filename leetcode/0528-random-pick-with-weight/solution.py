import random
from typing import List


class Solution:
    def __init__(self, w: List[int]):
        self.prefix = []
        total = 0
        for weight in w:
            total += weight
            self.prefix.append(total)
        self.total = total

    def pickIndex(self) -> int:
        target = random.randint(1, self.total)
        lo, hi = 0, len(self.prefix) - 1
        while lo < hi:
            mid = lo + (hi - lo) // 2
            if self.prefix[mid] < target:
                lo = mid + 1
            else:
                hi = mid
        return lo


# Your Solution object will be instantiated and called as such:
# obj = Solution(w)
# param_1 = obj.pickIndex()
