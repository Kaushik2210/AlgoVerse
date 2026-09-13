import heapq
from typing import List


class Solution:
    def mincostToHireWorkers(self, quality: List[int], wage: List[int], k: int) -> float:
        n = len(quality)
        # Sort workers by their wage-to-quality ratio. This ratio is what every
        # worker in the final group would need to be paid at, so scanning from
        # lowest ratio to highest lets us fix that ratio one worker at a time.
        workers = sorted(range(n), key=lambda i: wage[i] / quality[i])

        max_heap = []  # negated qualities of the k cheapest-quality workers seen so far
        quality_sum = 0
        best = float("inf")

        for i in workers:
            ratio = wage[i] / quality[i]
            heapq.heappush(max_heap, -quality[i])
            quality_sum += quality[i]

            if len(max_heap) > k:
                # Drop the highest-quality worker to keep the group's total
                # quality (and thus total cost at this ratio) as small as possible.
                quality_sum += heapq.heappop(max_heap)

            if len(max_heap) == k:
                best = min(best, quality_sum * ratio)

        return best
