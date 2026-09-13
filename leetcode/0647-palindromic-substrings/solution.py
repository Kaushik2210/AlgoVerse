class Solution:
    def countSubstrings(self, s: str) -> int:
        n = len(s)
        count = 0

        def expand(left: int, right: int) -> None:
            nonlocal count
            while left >= 0 and right < n and s[left] == s[right]:
                count += 1
                left -= 1
                right += 1

        for center in range(n):
            expand(center, center)      # odd length, center is a character
            expand(center, center + 1)  # even length, center is a gap

        return count
