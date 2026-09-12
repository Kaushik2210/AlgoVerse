from typing import List


class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        result = []
        path = []

        def backtrack(start: int) -> None:
            result.append(path[:])
            for i in range(start, len(nums)):
                if i > start and nums[i] == nums[i - 1]:
                    continue  # skip duplicate picks at this recursion level
                path.append(nums[i])
                backtrack(i + 1)
                path.pop()

        backtrack(0)
        return result
