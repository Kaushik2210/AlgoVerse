from typing import List


class Solution:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        # first index at which each prefix-sum-mod-k value was seen
        first_index = {0: -1}
        prefix_sum = 0

        for i, x in enumerate(nums):
            prefix_sum += x
            remainder = prefix_sum % k if k != 0 else prefix_sum

            if remainder in first_index:
                if i - first_index[remainder] >= 2:
                    return True
            else:
                first_index[remainder] = i

        return False
