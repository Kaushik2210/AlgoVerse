from typing import List
from collections import defaultdict


class Solution:
    def numMatchingSubseq(self, s: str, words: List[str]) -> int:
        # waiting[c] holds (word, index_into_word) pairs whose next needed
        # character is c
        waiting = defaultdict(list)
        for word in words:
            waiting[word[0]].append((word, 0))

        count = 0
        for ch in s:
            bucket = waiting[ch]
            waiting[ch] = []
            for word, i in bucket:
                i += 1
                if i == len(word):
                    count += 1
                else:
                    waiting[word[i]].append((word, i))

        return count
