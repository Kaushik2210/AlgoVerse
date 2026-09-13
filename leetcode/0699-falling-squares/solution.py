from typing import List


class Solution:
    def fallingSquares(self, positions: List[List[int]]) -> List[int]:
        # each landed square remembered as (left, right, top_height)
        placed = []
        result = []
        max_height_so_far = 0

        for left, size in positions:
            right = left + size
            base = 0
            for pl, pr, ptop in placed:
                # overlap in the open horizontal interval (touching edges don't count)
                if pl < right and left < pr:
                    base = max(base, ptop)
            top = base + size
            placed.append((left, right, top))
            max_height_so_far = max(max_height_so_far, top)
            result.append(max_height_so_far)

        return result
