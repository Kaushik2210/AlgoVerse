import bisect
from typing import List


class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        tails = []  # tails[i] = smallest possible tail value of an increasing subsequence of length i+1

        for n in nums:
            pos = bisect.bisect_left(tails, n)
            if pos == len(tails):
                tails.append(n)
            else:
                tails[pos] = n

        return len(tails)
