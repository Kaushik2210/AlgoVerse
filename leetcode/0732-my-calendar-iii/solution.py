from collections import defaultdict


class MyCalendarThree:

    def __init__(self):
        self.deltas = defaultdict(int)

    def book(self, start: int, end: int) -> int:
        self.deltas[start] += 1
        self.deltas[end] -= 1

        active = 0
        best = 0
        for pos in sorted(self.deltas):
            active += self.deltas[pos]
            best = max(best, active)
        return best


# Your MyCalendarThree object will be instantiated and called as such:
# obj = MyCalendarThree()
# param_1 = obj.book(start,end)
