from typing import List


class BIT:
    def __init__(self, size: int):
        self.size = size
        self.tree = [0] * (size + 1)

    def update(self, i: int, delta: int = 1) -> None:
        while i <= self.size:
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i: int) -> int:
        # prefix sum of counts for values in [1, i]
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)
        return total


class Solution:
    def createSortedArray(self, instructions: List[int]) -> int:
        MOD = 10 ** 9 + 7
        max_val = max(instructions)
        bit = BIT(max_val)

        cost = 0
        for i, value in enumerate(instructions):
            less = bit.query(value - 1)
            greater = i - bit.query(value)  # elements inserted so far minus those <= value
            cost += min(less, greater)
            bit.update(value)

        return cost % MOD
