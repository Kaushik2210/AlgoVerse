# """
# This is ArrayReader's API interface.
# You should not implement it, or speculate about its implementation.
# """
# class ArrayReader:
#     def get(self, index: int) -> int:


class Solution:
    def search(self, reader: 'ArrayReader', target: int) -> int:
        # Exponential (galloping) search to find an upper bound that
        # either overshoots the target or falls off the end of the array.
        bound = 1
        while reader.get(bound) < target:
            bound *= 2

        lo, hi = bound // 2, bound
        while lo <= hi:
            mid = lo + (hi - lo) // 2
            val = reader.get(mid)
            if val == target:
                return mid
            elif val < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return -1
