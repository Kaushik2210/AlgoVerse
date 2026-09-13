from functools import lru_cache


class Solution:
    def isScramble(self, s1: str, s2: str) -> bool:
        if len(s1) != len(s2):
            return False

        @lru_cache(maxsize=None)
        def helper(a: str, b: str) -> bool:
            if a == b:
                return True
            if sorted(a) != sorted(b):
                return False

            n = len(a)
            for i in range(1, n):
                # Case 1: no swap at this split - left stays left, right stays right.
                if helper(a[:i], b[:i]) and helper(a[i:], b[i:]):
                    return True
                # Case 2: swapped at this split - left of a matches right of b.
                if helper(a[:i], b[n - i:]) and helper(a[i:], b[:n - i]):
                    return True

            return False

        return helper(s1, s2)
