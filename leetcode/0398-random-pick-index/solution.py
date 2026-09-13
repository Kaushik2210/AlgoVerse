import random
from typing import List


class Solution:
    def __init__(self, nums: List[int]):
        self.nums = nums

    def pick(self, target: int) -> int:
        result = -1
        count = 0
        for i, x in enumerate(self.nums):
            if x == target:
                count += 1
                if random.randint(1, count) == count:
                    result = i
        return result


# Your Solution object will be instantiated and called as such:
# obj = Solution(nums)
# param_1 = obj.pick(target)
