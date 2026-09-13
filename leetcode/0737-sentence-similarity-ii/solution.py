from typing import List


class Solution:
    def areSentencesSimilarTwo(self, sentence1: List[str], sentence2: List[str], similarPairs: List[List[str]]) -> bool:
        if len(sentence1) != len(sentence2):
            return False

        parent = {}

        def find(word: str) -> str:
            parent.setdefault(word, word)
            while parent[word] != word:
                parent[word] = parent[parent[word]]
                word = parent[word]
            return word

        def union(a: str, b: str) -> None:
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        for a, b in similarPairs:
            union(a, b)

        for w1, w2 in zip(sentence1, sentence2):
            if w1 == w2:
                continue
            if find(w1) != find(w2):
                return False

        return True
