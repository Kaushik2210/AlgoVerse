import heapq
from typing import List


class Solution:
    def getSkyline(self, buildings: List[List[int]]) -> List[List[int]]:
        # Every x-coordinate where the skyline could possibly change: every
        # building's left and right edge.
        xs = sorted(set(x for l, r, h in buildings for x in (l, r)))

        buildings_by_start = sorted(buildings, key=lambda b: b[0])
        n = len(buildings_by_start)
        ptr = 0

        # Max-heap of (-height, end) for buildings whose start has already
        # been reached; entries are lazily discarded once their end <= the
        # x-coordinate currently being processed.
        heap = []
        result = []
        prev_height = 0

        for x in xs:
            # Bring in every building that starts at or before this x.
            while ptr < n and buildings_by_start[ptr][0] <= x:
                l, r, h = buildings_by_start[ptr]
                heapq.heappush(heap, (-h, r))
                ptr += 1

            # Discard buildings that have already ended by this x (a
            # building's right edge is treated as exclusive, so a building
            # ending exactly at x no longer contributes here).
            while heap and heap[0][1] <= x:
                heapq.heappop(heap)

            current_height = -heap[0][0] if heap else 0
            if current_height != prev_height:
                result.append([x, current_height])
                prev_height = current_height

        return result
