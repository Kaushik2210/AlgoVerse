from typing import List


class Solution:
    def numberOfSubarrays(self, nums: List[int], k: int) -> int:
        def at_most(limit: int) -> int:
            if limit < 0:
                return 0
            left = 0
            odds = 0
            count = 0
            for right, x in enumerate(nums):
                if x % 2 == 1:
                    odds += 1
                while odds > limit:
                    if nums[left] % 2 == 1:
                        odds -= 1
                    left += 1
                count += right - left + 1
            return count

        return at_most(k) - at_most(k - 1)
