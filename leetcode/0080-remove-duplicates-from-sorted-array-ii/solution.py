from typing import List


class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        write = 0

        for read in range(len(nums)):
            if write < 2 or nums[read] != nums[write - 2]:
                nums[write] = nums[read]
                write += 1

        return write
