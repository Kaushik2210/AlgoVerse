from typing import List


class Solution:
    def minDominoRotations(self, tops: List[int], bottoms: List[int]) -> int:
        def rotations_needed(target: int) -> int:
            rotate_top = rotate_bottom = 0
            for a, b in zip(tops, bottoms):
                if a != target and b != target:
                    return -1
                elif a != target:
                    rotate_top += 1
                elif b != target:
                    rotate_bottom += 1
            return min(rotate_top, rotate_bottom)

        result = rotations_needed(tops[0])
        if result != -1:
            return result
        return rotations_needed(bottoms[0])
