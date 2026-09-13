from typing import List


class Solution:
    def longestCycle(self, edges: List[int]) -> int:
        n = len(edges)
        visit_time = [-1] * n  # time this node was stamped, across all walks
        answer = -1
        timer = 0

        for start in range(n):
            if visit_time[start] != -1:
                continue

            walk_start_time = timer
            u = start
            while u != -1 and visit_time[u] == -1:
                visit_time[u] = timer
                timer += 1
                u = edges[u]

            # If we ended on a node stamped during *this* walk (its stamp is
            # at or after where this walk began), we've found a cycle and
            # its length is the gap between when it was first stamped and now.
            if u != -1 and visit_time[u] >= walk_start_time:
                answer = max(answer, timer - visit_time[u])

        return answer
