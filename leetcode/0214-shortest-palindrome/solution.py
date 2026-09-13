class Solution:
    def shortestPalindrome(self, s: str) -> str:
        if not s:
            return s

        combined = s + "#" + s[::-1]
        n = len(combined)
        fail = [0] * n

        for i in range(1, n):
            length = fail[i - 1]
            while length > 0 and combined[i] != combined[length]:
                length = fail[length - 1]
            if combined[i] == combined[length]:
                length += 1
            fail[i] = length

        longest_palindrome_prefix = fail[-1]
        suffix_to_prepend = s[longest_palindrome_prefix:][::-1]
        return suffix_to_prepend + s
