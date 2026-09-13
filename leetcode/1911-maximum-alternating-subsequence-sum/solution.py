from typing import List


class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        even, odd = 0, 0
        for x in nums:
            new_even = max(even, odd + x)
            new_odd = max(odd, even - x)
            even, odd = new_even, new_odd
        return even
