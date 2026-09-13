from typing import List


class Solution:
    def findDiagonalOrder(self, nums: List[List[int]]) -> List[int]:
        # group values by diagonal index (row + col); within a diagonal,
        # entries with a larger row come first (they were appended later
        # in row order but need to be read out in reverse), so collecting
        # by diagonal and reversing each group gives the right order.
        diagonals = {}
        for i, row in enumerate(nums):
            for j, val in enumerate(row):
                diagonals.setdefault(i + j, []).append(val)

        result = []
        for key in sorted(diagonals.keys()):
            result.extend(reversed(diagonals[key]))
        return result
