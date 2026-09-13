from typing import List
from collections import defaultdict
import heapq


class Solution:
    def highFive(self, items: List[List[int]]) -> List[List[int]]:
        # keep a min-heap of size 5 per student, so the heap always holds
        # that student's five highest scores seen so far
        heaps = defaultdict(list)
        for student_id, score in items:
            heap = heaps[student_id]
            heapq.heappush(heap, score)
            if len(heap) > 5:
                heapq.heappop(heap)

        result = []
        for student_id in sorted(heaps.keys()):
            top_five = heaps[student_id]
            average = sum(top_five) // 5
            result.append([student_id, average])

        return result
