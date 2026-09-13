from typing import List


class TrieNode:
    __slots__ = ("children", "max_index")

    def __init__(self):
        self.children = {}
        self.max_index = -1


class WordFilter:
    def __init__(self, words: List[str]):
        self.root = TrieNode()
        for index, word in enumerate(words):
            # for every suffix of word, insert "suffix#word" into the trie,
            # so a query can walk one combined path instead of intersecting two searches
            for k in range(len(word) + 1):
                combo = word[k:] + "#" + word
                node = self.root
                node.max_index = index
                for ch in combo:
                    if ch not in node.children:
                        node.children[ch] = TrieNode()
                    node = node.children[ch]
                    node.max_index = index  # later (larger) indices overwrite earlier ones

    def f(self, prefix: str, suffix: str) -> int:
        combo = suffix + "#" + prefix
        node = self.root
        for ch in combo:
            if ch not in node.children:
                return -1
            node = node.children[ch]
        return node.max_index
