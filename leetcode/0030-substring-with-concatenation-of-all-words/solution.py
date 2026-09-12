from collections import Counter
from typing import List


class Solution:
    def findSubstring(self, s: str, words: List[str]) -> List[int]:
        if not s or not words:
            return []

        word_len = len(words[0])
        num_words = len(words)
        window_len = word_len * num_words

        if window_len > len(s):
            return []

        word_count = Counter(words)
        result = []

        for start in range(0, len(s) - window_len + 1):
            seen = Counter()
            ok = True

            for i in range(num_words):
                chunk_start = start + i * word_len
                chunk = s[chunk_start:chunk_start + word_len]

                if chunk not in word_count:
                    ok = False
                    break

                seen[chunk] += 1
                if seen[chunk] > word_count[chunk]:
                    ok = False
                    break

            if ok:
                result.append(start)

        return result
