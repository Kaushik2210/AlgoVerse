from typing import List


class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        # sort by end point: greedily picking the pair that finishes earliest
        # at each step leaves the most room for everything that comes after
        pairs.sort(key=lambda p: p[1])

        count = 0
        current_end = float("-inf")
        for start, end in pairs:
            if start > current_end:
                count += 1
                current_end = end

        return count
