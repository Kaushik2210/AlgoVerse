from typing import List


class Solution:
    def maxSubArrayLen(self, nums: List[int], k: int) -> int:
        first_seen = {0: -1}
        prefix = 0
        best = 0
        for i, x in enumerate(nums):
            prefix += x
            needed = prefix - k
            if needed in first_seen:
                best = max(best, i - first_seen[needed])
            if prefix not in first_seen:
                first_seen[prefix] = i
        return best
