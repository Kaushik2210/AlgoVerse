class RangeModule:
    def __init__(self):
        self.intervals = []  # sorted, disjoint, non-adjacent [start, end) pairs

    def addRange(self, left: int, right: int) -> None:
        new_intervals = []
        i, n = 0, len(self.intervals)
        # intervals entirely before the new range (with a gap, not touching) stay untouched
        while i < n and self.intervals[i][1] < left:
            new_intervals.append(self.intervals[i])
            i += 1
        # absorb every interval that overlaps OR touches [left, right] into one merged range
        while i < n and self.intervals[i][0] <= right:
            left = min(left, self.intervals[i][0])
            right = max(right, self.intervals[i][1])
            i += 1
        new_intervals.append([left, right])
        # remaining intervals entirely after the new range stay untouched
        while i < n:
            new_intervals.append(self.intervals[i])
            i += 1
        self.intervals = new_intervals

    def queryRange(self, left: int, right: int) -> bool:
        for s, e in self.intervals:
            if s <= left and right <= e:
                return True
            if s > left:
                break  # intervals are sorted, no later one can cover left
        return False

    def removeRange(self, left: int, right: int) -> None:
        new_intervals = []
        for s, e in self.intervals:
            if e <= left or s >= right:
                # no overlap at all with the range being removed
                new_intervals.append([s, e])
            else:
                # this interval overlaps [left, right); keep whatever sticks out on each side
                if s < left:
                    new_intervals.append([s, left])
                if e > right:
                    new_intervals.append([right, e])
        self.intervals = new_intervals


# Your RangeModule object will be instantiated and called as such:
# obj = RangeModule()
# obj.addRange(left,right)
# param_2 = obj.queryRange(left,right)
# obj.removeRange(left,right)
