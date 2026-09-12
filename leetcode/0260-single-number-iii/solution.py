from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        xor_all = 0
        for n in nums:
            xor_all ^= n

        # isolate the lowest set bit
        diff_bit = xor_all & (-xor_all)

        a = 0
        for n in nums:
            if n & diff_bit:
                a ^= n

        b = xor_all ^ a
        return [a, b]
