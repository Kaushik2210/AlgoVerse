from typing import List


class Solution:
    def beautifulArray(self, n: int) -> List[int]:
        memo = {1: [1]}

        def build(n: int) -> List[int]:
            if n in memo:
                return memo[n]

            # Split into an "odd-transformed" half and an "even-transformed"
            # half. Any beautiful sub-array, when mapped through 2x-1 (all
            # odd results) or 2x (all even results), stays beautiful --
            # and gluing an all-odd sequence to an all-even one can never
            # create a new violation, since an odd number and an even
            # number can never average to an integer strictly between them.
            odds = [2 * x - 1 for x in build((n + 1) // 2)]
            evens = [2 * x for x in build(n // 2)]
            memo[n] = odds + evens
            return memo[n]

        return build(n)
