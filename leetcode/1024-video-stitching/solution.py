from typing import List


class Solution:
    def videoStitching(self, clips: List[List[int]], time: int) -> int:
        farthest = [0] * time
        for start, end in clips:
            if start < time:
                farthest[start] = max(farthest[start], end)

        count = 0
        current_end = 0
        next_end = 0
        s = 0
        while current_end < time:
            while s <= current_end and s < time:
                next_end = max(next_end, farthest[s])
                s += 1
            if next_end <= current_end:
                return -1
            count += 1
            current_end = next_end
        return count
