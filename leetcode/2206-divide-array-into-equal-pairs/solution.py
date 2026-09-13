from typing import List
from collections import Counter


class Solution:
    def divideArray(self, nums: List[int]) -> bool:
        # a value can only be fully paired off with copies of itself
        # if it shows up an even number of times
        counts = Counter(nums)
        return all(c % 2 == 0 for c in counts.values())
