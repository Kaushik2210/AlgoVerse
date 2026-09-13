from typing import List


class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        # map running (ones - zeros) balance -> earliest index it was seen at
        first_seen = {0: -1}
        balance = 0
        best = 0
        for i, x in enumerate(nums):
            balance += 1 if x == 1 else -1
            if balance in first_seen:
                best = max(best, i - first_seen[balance])
            else:
                first_seen[balance] = i
        return best
