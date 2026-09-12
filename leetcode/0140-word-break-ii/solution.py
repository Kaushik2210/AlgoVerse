from typing import List
from functools import lru_cache


class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        words = set(wordDict)
        n = len(s)

        @lru_cache(maxsize=None)
        def break_from(i: int) -> List[str]:
            if i == n:
                return [""]

            sentences = []
            for j in range(i + 1, n + 1):
                word = s[i:j]
                if word in words:
                    for rest in break_from(j):
                        sentences.append(word if not rest else word + " " + rest)
            return sentences

        result = break_from(0)
        break_from.cache_clear()
        return result
