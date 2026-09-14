from typing import List


class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        lo, hi = 0, len(arr) - k
        while lo < hi:
            mid = lo + (hi - lo) // 2
            # Compare the element just outside the window on each side:
            # if x is closer to arr[mid + k] than to arr[mid], the window
            # should slide right, otherwise keep/shrink toward the left.
            if x - arr[mid] > arr[mid + k] - x:
                lo = mid + 1
            else:
                hi = mid
        return arr[lo:lo + k]
