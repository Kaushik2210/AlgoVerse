from typing import List


class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        total = sum(stones)
        target = total // 2

        # subset-sum: find the largest achievable sum <= target, then the
        # remaining stones sum to total - that, and the answer is the
        # difference between the two groups.
        reachable = {0}
        for s in stones:
            reachable |= {s + r for r in reachable if s + r <= target}

        best = max(reachable)
        return total - 2 * best
