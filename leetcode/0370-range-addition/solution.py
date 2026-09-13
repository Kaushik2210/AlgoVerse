from typing import List


class Solution:
    def getModifiedArray(self, length: int, updates: List[List[int]]) -> List[int]:
        diff = [0] * (length + 1)
        for start, end, inc in updates:
            diff[start] += inc
            diff[end + 1] -= inc

        result = [0] * length
        running = 0
        for i in range(length):
            running += diff[i]
            result[i] = running
        return result
