import heapq
from typing import List


class Solution:
    def scheduleCourse(self, courses: List[List[int]]) -> int:
        # take courses in deadline order; whenever the running total blows past
        # a deadline, kick out the single most time-consuming course taken so
        # far (not necessarily this one) since that frees up the most room
        courses.sort(key=lambda c: c[1])

        max_heap = []  # negated durations of courses currently "taken"
        total_time = 0

        for duration, deadline in courses:
            heapq.heappush(max_heap, -duration)
            total_time += duration

            if total_time > deadline:
                total_time += heapq.heappop(max_heap)  # heappop gives -largest, so this subtracts it

        return len(max_heap)
