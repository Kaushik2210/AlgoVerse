from typing import List


class Solution:
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        if not matrix or not matrix[0]:
            return 0

        n = len(matrix[0])
        heights = [0] * n
        best = 0

        for row in matrix:
            for j in range(n):
                heights[j] = heights[j] + 1 if row[j] == "1" else 0
            best = max(best, self._largest_rectangle(heights))

        return best

    def _largest_rectangle(self, heights: List[int]) -> int:
        stack = []
        max_area = 0

        for i, h in enumerate(heights + [0]):
            while stack and heights[stack[-1]] >= h:
                height = heights[stack.pop()]
                width = i if not stack else i - stack[-1] - 1
                max_area = max(max_area, height * width)
            stack.append(i)

        return max_area
