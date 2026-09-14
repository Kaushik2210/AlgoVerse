from typing import List


class Solution:
    def selfDividingNumbers(self, left: int, right: int) -> List[int]:
        def is_self_dividing(n: int) -> bool:
            x = n
            while x:
                digit = x % 10
                if digit == 0 or n % digit != 0:
                    return False
                x //= 10
            return True

        return [n for n in range(left, right + 1) if is_self_dividing(n)]
