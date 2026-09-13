from typing import List


class Solution:
    def totalHammingDistance(self, nums: List[int]) -> int:
        n = len(nums)
        total = 0
        for bit in range(30):
            ones = sum((num >> bit) & 1 for num in nums)
            total += ones * (n - ones)
        return total
