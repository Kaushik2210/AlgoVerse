from typing import List


class Solution:
    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:
        if k <= 1:
            return 0

        left = 0
        product = 1
        count = 0
        for right, x in enumerate(nums):
            product *= x
            while product >= k:
                product //= nums[left]
                left += 1
            count += right - left + 1
        return count
