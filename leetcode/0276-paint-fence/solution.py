class Solution:
    def numWays(self, n: int, k: int) -> int:
        if n == 0:
            return 0
        if n == 1:
            return k

        same, diff = 0, k

        for _ in range(2, n + 1):
            new_same = diff
            new_diff = (same + diff) * (k - 1)
            same, diff = new_same, new_diff

        return same + diff
