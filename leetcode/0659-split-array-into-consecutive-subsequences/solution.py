from collections import Counter
from typing import List


class Solution:
    def isPossible(self, nums: List[int]) -> bool:
        count = Counter(nums)
        tails = Counter()

        for x in nums:
            if count[x] == 0:
                continue
            count[x] -= 1
            if tails[x - 1] > 0:
                tails[x - 1] -= 1
                tails[x] += 1
            elif count[x + 1] > 0 and count[x + 2] > 0:
                count[x + 1] -= 1
                count[x + 2] -= 1
                tails[x + 2] += 1
            else:
                return False
        return True
