from typing import List


class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        def at_most(k: int) -> int:
            if k < 0:
                return 0
            left = 0
            total = 0
            count = 0
            for right, x in enumerate(nums):
                total += x
                while total > k:
                    total -= nums[left]
                    left += 1
                count += right - left + 1
            return count

        return at_most(goal) - at_most(goal - 1)
