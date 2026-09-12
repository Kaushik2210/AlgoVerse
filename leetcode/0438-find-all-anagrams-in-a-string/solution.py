from typing import List
from collections import Counter


class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        n1, n2 = len(p), len(s)
        if n1 > n2:
            return []

        need = Counter(p)
        window = Counter(s[:n1])
        result = []

        if window == need:
            result.append(0)

        for i in range(n1, n2):
            window[s[i]] += 1
            left_char = s[i - n1]
            window[left_char] -= 1
            if window[left_char] == 0:
                del window[left_char]
            if window == need:
                result.append(i - n1 + 1)

        return result
