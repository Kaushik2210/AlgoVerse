from typing import List


class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
        result = []
        running = 0
        for x in nums:
            running += x
            result.append(running)
        return result
