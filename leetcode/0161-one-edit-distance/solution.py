class Solution:
    def isOneEditDistance(self, s: str, t: str) -> bool:
        if abs(len(s) - len(t)) > 1:
            return False

        if len(s) == len(t):
            differences = sum(1 for a, b in zip(s, t) if a != b)
            return differences == 1

        if len(s) > len(t):
            s, t = t, s

        i = j = 0
        found_difference = False
        while i < len(s) and j < len(t):
            if s[i] == t[j]:
                i += 1
                j += 1
            else:
                if found_difference:
                    return False
                found_difference = True
                j += 1

        return True
