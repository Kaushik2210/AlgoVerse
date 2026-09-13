class Solution:
    def findKthNumber(self, m: int, n: int, k: int) -> int:
        def count_le(x: int) -> int:
            total = 0
            for i in range(1, m + 1):
                total += min(x // i, n)
            return total

        lo, hi = 1, m * n
        while lo < hi:
            mid = (lo + hi) // 2
            if count_le(mid) >= k:
                hi = mid
            else:
                lo = mid + 1
        return lo
