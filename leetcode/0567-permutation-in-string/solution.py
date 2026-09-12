from collections import Counter


class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        n1, n2 = len(s1), len(s2)
        if n1 > n2:
            return False

        need = Counter(s1)
        window = Counter(s2[:n1])

        if window == need:
            return True

        for i in range(n1, n2):
            window[s2[i]] += 1
            left_char = s2[i - n1]
            window[left_char] -= 1
            if window[left_char] == 0:
                del window[left_char]
            if window == need:
                return True

        return False
