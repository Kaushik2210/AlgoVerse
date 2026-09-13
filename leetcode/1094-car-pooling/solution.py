from typing import List


class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        delta = [0] * 1001
        for num, start, end in trips:
            delta[start] += num
            delta[end] -= num

        passengers = 0
        for change in delta:
            passengers += change
            if passengers > capacity:
                return False
        return True
