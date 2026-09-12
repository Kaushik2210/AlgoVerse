from typing import List


class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        left = 0
        window_sum = 0
        best = float('inf')

        for right in range(len(nums)):
            window_sum += nums[right]
            while window_sum >= target:
                best = min(best, right - left + 1)
                window_sum -= nums[left]
                left += 1

        return best if best != float('inf') else 0
