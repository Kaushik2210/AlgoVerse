from typing import List


class Interval:
    def __init__(self, start: int = None, end: int = None):
        self.start = start
        self.end = end


class Solution:
    def employeeFreeTime(self, schedule: List[List[Interval]]) -> List[Interval]:
        intervals = [iv for employee in schedule for iv in employee]
        intervals.sort(key=lambda iv: iv.start)

        merged = []
        for iv in intervals:
            if merged and iv.start <= merged[-1].end:
                merged[-1].end = max(merged[-1].end, iv.end)
            else:
                merged.append(Interval(iv.start, iv.end))

        free = []
        for i in range(1, len(merged)):
            if merged[i - 1].end < merged[i].start:
                free.append(Interval(merged[i - 1].end, merged[i].start))
        return free
