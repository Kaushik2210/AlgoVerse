from typing import List


class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        starts = sorted(i[0] for i in intervals)
        ends = sorted(i[1] for i in intervals)

        rooms = 0
        max_rooms = 0
        s = e = 0

        while s < len(starts):
            if starts[s] < ends[e]:
                rooms += 1
                max_rooms = max(max_rooms, rooms)
                s += 1
            else:
                rooms -= 1
                e += 1

        return max_rooms
