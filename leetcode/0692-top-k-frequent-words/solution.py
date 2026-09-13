from typing import List
from collections import Counter


class Solution:
    def topKFrequent(self, words: List[str], k: int) -> List[str]:
        counts = Counter(words)
        # higher count first; on a tie, lexicographically smaller word first
        ordered = sorted(counts.keys(), key=lambda w: (-counts[w], w))
        return ordered[:k]
