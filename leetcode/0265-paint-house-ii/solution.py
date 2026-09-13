from typing import List


class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        if not costs:
            return 0

        n = len(costs)
        k = len(costs[0])

        prev = costs[0][:]

        for house in range(1, n):
            # Track the smallest and second-smallest previous-house costs,
            # along with which color achieved the smallest, so each color
            # this round can look up "best cost from any *other* color" in O(1).
            min1 = min2 = float("inf")
            min1_idx = -1
            for c in range(k):
                if prev[c] < min1:
                    min2 = min1
                    min1 = prev[c]
                    min1_idx = c
                elif prev[c] < min2:
                    min2 = prev[c]

            curr = [0] * k
            for c in range(k):
                best_other = min2 if c == min1_idx else min1
                curr[c] = costs[house][c] + best_other

            prev = curr

        return min(prev)
