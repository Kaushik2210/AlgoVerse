class Solution:
    def getSum(self, a: int, b: int) -> int:
        mask = 0xFFFFFFFF
        while b & mask:
            carry = (a & b) << 1
            a = (a ^ b) & mask
            b = carry & mask
        result = a & mask
        if result > 0x7FFFFFFF:
            result -= 0x100000000
        return result
