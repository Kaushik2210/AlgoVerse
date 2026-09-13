class Solution:
    def getSmallestString(self, n: int, k: int) -> str:
        # every position must hold at least 'a' (value 1), so start with a baseline
        # of n and distribute the remaining value, greedily pushed as far right
        # as possible so the earlier characters stay as small as possible
        result = ["a"] * n
        remaining = k - n

        for i in range(n - 1, -1, -1):
            if remaining <= 0:
                break
            add = min(25, remaining)  # 'a' + add, capped so it never exceeds 'z' (value 26)
            result[i] = chr(ord("a") + add)
            remaining -= add

        return "".join(result)
