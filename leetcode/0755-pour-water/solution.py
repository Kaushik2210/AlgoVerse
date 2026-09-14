from typing import List


class Solution:
    def pourWater(self, heights: List[int], volume: int, k: int) -> List[int]:
        n = len(heights)

        for _ in range(volume):
            best = k

            # try to flow left
            i = k
            while i - 1 >= 0 and heights[i - 1] <= heights[i]:
                i -= 1
                if heights[i] < heights[best]:
                    best = i
            if best != k:
                heights[best] += 1
                continue

            # try to flow right
            i = k
            while i + 1 < n and heights[i + 1] <= heights[i]:
                i += 1
                if heights[i] < heights[best]:
                    best = i

            heights[best] += 1

        return heights
