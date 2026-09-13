from collections import Counter
from typing import List


class Solution:
    def minSetSize(self, arr: List[int]) -> int:
        n = len(arr)
        counts = sorted(Counter(arr).values(), reverse=True)

        removed = 0
        for i, cnt in enumerate(counts):
            removed += cnt
            if removed * 2 >= n:
                return i + 1
        return len(counts)
