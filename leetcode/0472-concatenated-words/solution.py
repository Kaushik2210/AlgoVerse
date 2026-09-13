from typing import List


class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        word_set = set(words)
        memo = {}

        def canBuild(word: str) -> bool:
            # can `word` be fully assembled from >= 2 other words in word_set?
            if word in memo:
                return memo[word]
            memo[word] = False  # guard against reuse while computing (no cycles expected, but safe)
            n = len(word)
            dp = [False] * (n + 1)
            dp[0] = True
            for i in range(1, n + 1):
                for j in range(0, i):
                    if not dp[j]:
                        continue
                    piece = word[j:i]
                    # piece must be a real word other than `word` itself when it spans the whole thing
                    if piece == word:
                        continue
                    if piece in word_set:
                        dp[i] = True
                        break
            memo[word] = dp[n]
            return dp[n]

        result = []
        for w in words:
            if len(w) == 0:
                continue
            if canBuild(w):
                result.append(w)
        return result
