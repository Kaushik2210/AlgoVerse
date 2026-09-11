class Solution:
    def numDecodings(self, s: str) -> int:
        if not s or s[0] == '0':
            return 0

        n = len(s)
        # prev2 = ways to decode s[:i-1], prev1 = ways to decode s[:i]
        prev2, prev1 = 1, 1  # prev2 covers the empty prefix before index 0

        for i in range(1, n):
            current = 0

            # single digit s[i] on its own, must be non-zero
            if s[i] != '0':
                current += prev1

            # two digits s[i-1:i+1] together, must be between 10 and 26
            two_digit = int(s[i - 1:i + 1])
            if 10 <= two_digit <= 26:
                current += prev2

            if current == 0:
                return 0

            prev2, prev1 = prev1, current

        return prev1
