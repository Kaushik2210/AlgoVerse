from typing import List


class Solution:
    def minNumberOfSemesters(self, n: int, relations: List[List[int]], k: int) -> int:
        # prereq[c] = bitmask of every course that must be completed before
        # course c (courses are 0-indexed here internally)
        prereq = [0] * n
        for a, b in relations:
            prereq[b - 1] |= 1 << (a - 1)

        full = (1 << n) - 1
        INF = float('inf')
        dp = [INF] * (1 << n)
        dp[0] = 0

        for mask in range(1 << n):
            if dp[mask] == INF:
                continue

            # Courses not yet taken whose prerequisites are fully satisfied
            # by the courses already taken in this mask.
            available = 0
            for c in range(n):
                if mask & (1 << c):
                    continue
                if (prereq[c] & mask) == prereq[c]:
                    available |= 1 << c

            if available == 0:
                continue

            # Try every possible subset of the available courses (up to k of
            # them) that could be taken together next semester.
            sub = available
            while sub > 0:
                if bin(sub).count('1') <= k:
                    new_mask = mask | sub
                    if dp[mask] + 1 < dp[new_mask]:
                        dp[new_mask] = dp[mask] + 1
                sub = (sub - 1) & available

        return dp[full]
