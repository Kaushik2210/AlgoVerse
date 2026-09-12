class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        INT_MIN, INT_MAX = -2**31, 2**31 - 1

        if dividend == INT_MIN and divisor == -1:
            return INT_MAX

        negative = (dividend < 0) != (divisor < 0)

        remaining = abs(dividend)
        div = abs(divisor)

        quotient = 0
        while remaining >= div:
            chunk = div
            multiple = 1
            while remaining >= (chunk << 1):
                chunk <<= 1
                multiple <<= 1
            remaining -= chunk
            quotient += multiple

        if negative:
            quotient = -quotient

        return max(INT_MIN, min(INT_MAX, quotient))
