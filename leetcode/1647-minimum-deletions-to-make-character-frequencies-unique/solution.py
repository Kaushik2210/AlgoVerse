from collections import Counter


class Solution:
    def minDeletions(self, s: str) -> int:
        freq = Counter(s)
        used = set()
        deletions = 0

        for count in freq.values():
            while count > 0 and count in used:
                count -= 1
                deletions += 1
            if count > 0:
                used.add(count)

        return deletions
