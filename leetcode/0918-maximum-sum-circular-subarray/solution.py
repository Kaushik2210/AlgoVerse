from typing import List


class Solution:
    def maxSubarraySumCircular(self, nums: List[int]) -> int:
        total = 0
        cur_max, max_sum = 0, nums[0]
        cur_min, min_sum = 0, nums[0]

        for x in nums:
            total += x
            cur_max = max(cur_max, 0) + x
            max_sum = max(max_sum, cur_max)
            cur_min = min(cur_min, 0) + x
            min_sum = min(min_sum, cur_min)

        if max_sum < 0:
            # every number is negative, wrap-around trick would give an empty subarray
            return max_sum

        return max(max_sum, total - min_sum)
