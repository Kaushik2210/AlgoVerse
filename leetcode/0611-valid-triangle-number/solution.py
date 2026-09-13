from typing import List


class Solution:
    def triangleNumber(self, nums: List[int]) -> int:
        nums.sort()
        n = len(nums)
        count = 0
        for k in range(n - 1, 1, -1):
            i, j = 0, k - 1
            while i < j:
                if nums[i] + nums[j] > nums[k]:
                    # nums[i..j-1] paired with nums[j] all work too,
                    # since they're all >= nums[i].
                    count += j - i
                    j -= 1
                else:
                    i += 1
        return count
