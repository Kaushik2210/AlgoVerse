from typing import List
from collections import Counter


class Solution:
    def relativeSortArray(self, arr1: List[int], arr2: List[int]) -> List[int]:
        counts = Counter(arr1)
        result = []

        for x in arr2:
            result.extend([x] * counts[x])
            del counts[x]

        # remaining elements weren't in arr2: append sorted ascending
        for x in sorted(counts.elements()):
            result.append(x)

        return result
