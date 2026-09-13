class Solution:
    def hammingDistance(self, x: int, y: int) -> int:
        v = x ^ y
        count = 0
        while v:
            v &= v - 1
            count += 1
        return count
