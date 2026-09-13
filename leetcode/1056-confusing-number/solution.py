class Solution:
    def confusingNumber(self, n: int) -> bool:
        rotation = {0: 0, 1: 1, 6: 9, 8: 8, 9: 6}

        original = n
        rotated = 0
        while n > 0:
            digit = n % 10
            if digit not in rotation:
                return False
            # The digit we just peeled off (currently the least
            # significant) becomes the new MOST significant digit once
            # the whole number is flipped 180 degrees, so build the
            # result by shifting left and appending, not by place value.
            rotated = rotated * 10 + rotation[digit]
            n //= 10

        return rotated != original
