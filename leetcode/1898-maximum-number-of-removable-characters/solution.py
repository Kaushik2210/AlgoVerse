from typing import List


class Solution:
    def maximumRemovals(self, s: str, p: str, removable: List[int]) -> int:
        n = len(s)

        def is_subsequence(k: int) -> bool:
            removed = set(removable[:k])
            j = 0
            for i in range(n):
                if i in removed:
                    continue
                if j < len(p) and s[i] == p[j]:
                    j += 1
            return j == len(p)

        lo, hi = 0, len(removable)
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if is_subsequence(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo
