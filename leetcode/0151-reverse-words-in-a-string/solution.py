class Solution:
    def reverseWords(self, s: str) -> str:
        words = s.split()  # splits on runs of whitespace, drops empties
        return " ".join(reversed(words))
