from typing import List


class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # the maximum value of (a-1)*(b-1) always comes from the two largest
        # elements in nums, so track just those two in a single pass
        first = second = 0
        for num in nums:
            if num > first:
                first, second = num, first
            elif num > second:
                second = num

        return (first - 1) * (second - 1)
