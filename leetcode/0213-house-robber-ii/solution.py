from typing import List


class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]

        def rob_linear(houses: List[int]) -> int:
            rob1, rob2 = 0, 0
            for n in houses:
                rob1, rob2 = rob2, max(rob2, rob1 + n)
            return rob2

        return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))
