import bisect
from typing import List


class SnapshotArray:
    def __init__(self, length: int):
        self.snap_id = 0
        # history[index] is a list of [snap_id, value] pairs, sorted by snap_id,
        # recording every snapshot at which that index's value actually changed
        self.history: List[List[List[int]]] = [[[0, 0]] for _ in range(length)]

    def set(self, index: int, val: int) -> None:
        hist = self.history[index]
        if hist[-1][0] == self.snap_id:
            # already have an entry for the current (not-yet-taken) snapshot, overwrite it
            hist[-1][1] = val
        else:
            hist.append([self.snap_id, val])

    def snap(self) -> int:
        self.snap_id += 1
        return self.snap_id - 1

    def get(self, index: int, snap_id: int) -> int:
        hist = self.history[index]
        # find the last recorded entry whose snap_id is <= the requested one
        i = bisect.bisect_right(hist, [snap_id, float('inf')]) - 1
        return hist[i][1]


# Your SnapshotArray object will be instantiated and called as such:
# obj = SnapshotArray(length)
# obj.set(index,val)
# param_2 = obj.snap()
# param_3 = obj.get(index,snap_id)
