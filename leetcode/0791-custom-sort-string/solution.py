from collections import Counter


class Solution:
    def customSortString(self, order: str, s: str) -> str:
        counts = Counter(s)
        result = []

        for ch in order:
            if ch in counts:
                result.append(ch * counts[ch])
                del counts[ch]

        # any leftover characters not mentioned in order can go anywhere
        for ch, count in counts.items():
            result.append(ch * count)

        return ''.join(result)
