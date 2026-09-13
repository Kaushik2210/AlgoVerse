from typing import List


class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        # Sort by how much cheaper sending someone to city A is compared to city B.
        # Whoever benefits most from going to A should go to A.
        costs.sort(key=lambda c: c[0] - c[1])
        n = len(costs) // 2
        total = 0
        for i in range(n):
            total += costs[i][0]        # first half goes to city A
        for i in range(n, 2 * n):
            total += costs[i][1]        # second half goes to city B
        return total
