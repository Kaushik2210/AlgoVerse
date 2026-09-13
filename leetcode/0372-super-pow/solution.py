from typing import List

MOD = 1337


class Solution:
    def superPow(self, a: int, b: List[int]) -> int:
        def power(base: int, exp: int) -> int:
            base %= MOD
            result = 1
            while exp > 0:
                if exp & 1:
                    result = (result * base) % MOD
                base = (base * base) % MOD
                exp >>= 1
            return result

        result = 1
        for digit in b:
            result = (power(result, 10) * power(a, digit)) % MOD
        return result
