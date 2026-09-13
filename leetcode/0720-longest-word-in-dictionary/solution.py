from typing import List


class Solution:
    def longestWord(self, words: List[str]) -> str:
        word_set = set(words)
        best = ""
        for word in words:
            # every prefix of word (including the full word) must exist as its own word
            if all(word[:i] in word_set for i in range(1, len(word) + 1)):
                if len(word) > len(best) or (len(word) == len(best) and word < best):
                    best = word
        return best
