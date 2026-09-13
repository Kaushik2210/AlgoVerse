from typing import List


class Solution:
    def minimumLengthEncoding(self, words: List[str]) -> int:
        word_set = set(words)
        # a word doesn't need its own entry in the encoding if it is a proper
        # suffix of some other word in the list (that longer word covers it)
        for word in words:
            for k in range(1, len(word)):
                suffix = word[k:]
                word_set.discard(suffix)

        return sum(len(word) + 1 for word in word_set)
