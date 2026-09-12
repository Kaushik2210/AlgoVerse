from typing import List


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        result = []
        path = []

        def backtrack(start: int, remaining: int) -> None:
            if remaining == 0:
                result.append(path[:])
                return

            for i in range(start, len(candidates)):
                if candidates[i] > remaining:
                    break  # sorted, so nothing further can work either
                if i > start and candidates[i] == candidates[i - 1]:
                    continue  # skip duplicate picks at this recursion level

                path.append(candidates[i])
                backtrack(i + 1, remaining - candidates[i])
                path.pop()

        backtrack(0, target)
        return result
