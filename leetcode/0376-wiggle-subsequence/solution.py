from typing import List


class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        if not nums:
            return 0

        length = 1
        prev_diff = 0
        for i in range(1, len(nums)):
            diff = nums[i] - nums[i - 1]
            if diff > 0 and prev_diff <= 0:
                length += 1
                prev_diff = 1
            elif diff < 0 and prev_diff >= 0:
                length += 1
                prev_diff = -1
        return length
