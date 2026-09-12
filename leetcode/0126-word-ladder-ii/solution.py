import string
from collections import defaultdict
from typing import List


class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: List[str]) -> List[List[str]]:
        word_set = set(wordList)
        if endWord not in word_set:
            return []

        # parents[word] = set of words that can reach `word` in one step
        # on some shortest path from beginWord.
        parents = defaultdict(set)

        current_layer = {beginWord}
        word_set.discard(beginWord)
        found = False

        while current_layer and not found:
            # Words newly discovered while expanding this layer. Collected
            # separately so a word discovered by two different parents in
            # the same layer keeps both parent edges before being removed
            # from word_set.
            next_layer = defaultdict(set)

            for word in current_layer:
                for i in range(len(word)):
                    for c in string.ascii_lowercase:
                        if c == word[i]:
                            continue
                        candidate = word[:i] + c + word[i + 1:]
                        if candidate in word_set:
                            next_layer[candidate].add(word)

            for word in next_layer:
                word_set.discard(word)
                parents[word] |= next_layer[word]
                if word == endWord:
                    found = True

            current_layer = set(next_layer.keys())

        if not found:
            return []

        results = []

        def backtrack(word: str, path: List[str]) -> None:
            if word == beginWord:
                results.append([beginWord] + path[::-1])
                return
            for parent in parents[word]:
                backtrack(parent, path + [word])

        backtrack(endWord, [])
        return results
