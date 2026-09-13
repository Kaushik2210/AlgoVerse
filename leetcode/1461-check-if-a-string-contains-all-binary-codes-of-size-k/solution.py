class Solution:
    def hasAllCodes(self, s: str, k: int) -> bool:
        need = 1 << k
        if len(s) - k + 1 < need:
            return False

        seen = set()
        window = 0
        mask = need - 1  # keeps only the lowest k bits

        for i, ch in enumerate(s):
            window = ((window << 1) | (ch == '1')) & mask
            if i >= k - 1:
                seen.add(window)

        return len(seen) == need
