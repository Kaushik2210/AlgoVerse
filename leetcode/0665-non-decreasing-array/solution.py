from typing import List


class Solution:
    def checkPossibility(self, nums: List[int]) -> bool:
        modified = 0
        for i in range(1, len(nums)):
            if nums[i - 1] <= nums[i]:
                continue
            modified += 1
            if modified > 1:
                return False
            # Decide which value to change: prefer lowering nums[i-1] to
            # nums[i] unless that would break the pair before it, in which
            # case raise nums[i] up to nums[i-1] instead.
            if i < 2 or nums[i - 2] <= nums[i]:
                nums[i - 1] = nums[i]
            else:
                nums[i] = nums[i - 1]
        return True
