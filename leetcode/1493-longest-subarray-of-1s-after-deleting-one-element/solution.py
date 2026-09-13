from typing import List


class Solution:
    def longestSubarray(self, nums: List[int]) -> int:
        left = 0
        zeros = 0
        best = 0
        for right, x in enumerate(nums):
            if x == 0:
                zeros += 1
            while zeros > 1:
                if nums[left] == 0:
                    zeros -= 1
                left += 1
            # one element must always be deleted, so the window length
            # minus 1 is the count of 1s we can keep
            best = max(best, right - left)
        return best
