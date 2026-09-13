from typing import List


class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def lower_bound(x: int) -> int:
            lo, hi = 0, len(nums)
            while lo < hi:
                mid = lo + (hi - lo) // 2
                if nums[mid] < x:
                    lo = mid + 1
                else:
                    hi = mid
            return lo

        left = lower_bound(target)
        if left == len(nums) or nums[left] != target:
            return [-1, -1]
        right = lower_bound(target + 1) - 1
        return [left, right]
