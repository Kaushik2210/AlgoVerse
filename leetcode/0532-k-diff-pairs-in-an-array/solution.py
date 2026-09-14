from collections import Counter
from typing import List


class Solution:
    def findPairs(self, nums: List[int], k: int) -> int:
        if k < 0:
            return 0

        count = Counter(nums)
        result = 0

        if k == 0:
            for value, freq in count.items():
                if freq > 1:
                    result += 1
        else:
            for value in count:
                if value + k in count:
                    result += 1

        return result
