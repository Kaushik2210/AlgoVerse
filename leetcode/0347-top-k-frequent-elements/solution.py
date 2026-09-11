from typing import List
from collections import Counter


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        counts = Counter(nums)
        n = len(nums)

        buckets = [[] for _ in range(n + 1)]
        for value, freq in counts.items():
            buckets[freq].append(value)

        result = []
        for freq in range(n, 0, -1):
            for value in buckets[freq]:
                result.append(value)
                if len(result) == k:
                    return result

        return result
