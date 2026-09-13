from typing import List


class Solution:
    def findSubsequences(self, nums: List[int]) -> List[List[int]]:
        result = []
        path = []
        n = len(nums)

        def backtrack(start):
            if len(path) >= 2:
                result.append(path[:])

            seen_this_level = set()
            for i in range(start, n):
                if nums[i] in seen_this_level:
                    continue
                if path and nums[i] < path[-1]:
                    continue
                seen_this_level.add(nums[i])
                path.append(nums[i])
                backtrack(i + 1)
                path.pop()

        backtrack(0)
        return result
