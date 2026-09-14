from typing import List


class Solution:
    def findShortestSubArray(self, nums: List[int]) -> int:
        first_index = {}
        last_index = {}
        count = {}

        for i, x in enumerate(nums):
            if x not in first_index:
                first_index[x] = i
            last_index[x] = i
            count[x] = count.get(x, 0) + 1

        degree = max(count.values())
        answer = len(nums)
        for x, freq in count.items():
            if freq == degree:
                answer = min(answer, last_index[x] - first_index[x] + 1)

        return answer
