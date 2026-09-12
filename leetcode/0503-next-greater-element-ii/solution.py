from typing import List


class Solution:
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        n = len(nums)
        answer = [-1] * n
        stack = []  # indices, values in decreasing order

        for i in range(2 * n):
            idx = i % n
            while stack and nums[idx] > nums[stack[-1]]:
                answer[stack.pop()] = nums[idx]
            if i < n:
                stack.append(idx)

        return answer
