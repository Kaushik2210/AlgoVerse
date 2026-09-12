from collections import defaultdict


class Solution:
    def lengthOfLongestSubstringKDistinct(self, s: str, k: int) -> int:
        if k == 0:
            return 0

        counts = defaultdict(int)
        left = 0
        best = 0

        for right, ch in enumerate(s):
            counts[ch] += 1

            while len(counts) > k:
                left_ch = s[left]
                counts[left_ch] -= 1
                if counts[left_ch] == 0:
                    del counts[left_ch]
                left += 1

            best = max(best, right - left + 1)

        return best
