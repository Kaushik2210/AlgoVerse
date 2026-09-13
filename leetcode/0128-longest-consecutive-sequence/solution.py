from typing import List


class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        longest = 0
        for num in num_set:
            # Only start counting from the bottom of a run — if num - 1 is
            # also in the set, some earlier number will handle this run.
            if num - 1 in num_set:
                continue
            length = 1
            current = num
            while current + 1 in num_set:
                current += 1
                length += 1
            longest = max(longest, length)
        return longest
