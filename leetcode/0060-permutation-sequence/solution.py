from math import factorial


class Solution:
    def getPermutation(self, n: int, k: int) -> str:
        digits = [str(d) for d in range(1, n + 1)]
        k -= 1  # switch to 0-indexed rank

        result = []
        for i in range(n, 0, -1):
            block_size = factorial(i - 1)
            index = k // block_size
            k %= block_size

            result.append(digits.pop(index))

        return "".join(result)
