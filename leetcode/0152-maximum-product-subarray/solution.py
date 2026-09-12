from typing import List


class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        result = nums[0]
        curr_max = curr_min = nums[0]

        for num in nums[1:]:
            candidates = (num, num * curr_max, num * curr_min)
            curr_max = max(candidates)
            curr_min = min(candidates)
            result = max(result, curr_max)

        return result
