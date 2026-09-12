from typing import List
from collections import defaultdict


class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        prefix_count = defaultdict(int)
        prefix_count[0] = 1

        prefix_sum = 0
        count = 0

        for x in nums:
            prefix_sum += x
            count += prefix_count[prefix_sum - k]
            prefix_count[prefix_sum] += 1

        return count
