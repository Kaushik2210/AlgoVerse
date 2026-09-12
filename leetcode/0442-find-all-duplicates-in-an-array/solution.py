from typing import List


class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        result = []

        for x in nums:
            idx = abs(x) - 1
            if nums[idx] < 0:
                result.append(idx + 1)
            else:
                nums[idx] = -nums[idx]

        return result
