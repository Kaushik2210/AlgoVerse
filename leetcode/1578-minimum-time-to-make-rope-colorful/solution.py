from typing import List


class Solution:
    def minCost(self, colors: str, neededTime: List[int]) -> int:
        total = 0
        i = 0
        n = len(colors)

        while i < n:
            j = i
            group_sum = 0
            group_max = 0
            # scan a maximal run of the same color, tracking its total and max cost
            while j < n and colors[j] == colors[i]:
                group_sum += neededTime[j]
                group_max = max(group_max, neededTime[j])
                j += 1
            # keep the single most expensive balloon in the run, remove the rest
            total += group_sum - group_max
            i = j

        return total
