from typing import List


class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        result = []
        path = []

        def backtrack(start: int, remaining_count: int, remaining_sum: int) -> None:
            if remaining_count == 0:
                if remaining_sum == 0:
                    result.append(path[:])
                return

            if remaining_sum <= 0:
                return

            for candidate in range(start, 10):
                if candidate > remaining_sum:
                    break

                path.append(candidate)
                backtrack(candidate + 1, remaining_count - 1, remaining_sum - candidate)
                path.pop()

        backtrack(1, k, n)
        return result
