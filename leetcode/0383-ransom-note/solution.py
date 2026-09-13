class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        counts = [0] * 26
        for ch in magazine:
            counts[ord(ch) - ord('a')] += 1
        for ch in ransomNote:
            idx = ord(ch) - ord('a')
            counts[idx] -= 1
            if counts[idx] < 0:
                return False
        return True
