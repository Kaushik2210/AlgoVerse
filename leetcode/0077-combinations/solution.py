from typing import List


class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        result = []
        combo = []

        def backtrack(start: int) -> None:
            if len(combo) == k:
                result.append(combo[:])
                return

            for num in range(start, n + 1):
                combo.append(num)
                backtrack(num + 1)
                combo.pop()

        backtrack(1)
        return result
