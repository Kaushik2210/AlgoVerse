from typing import List


class TrieNode:
    __slots__ = ("children", "is_word")

    def __init__(self):
        self.children = {}
        self.is_word = False


class StreamChecker:
    def __init__(self, words: List[str]):
        self.root = TrieNode()
        max_len = 0
        for w in words:
            max_len = max(max_len, len(w))
            node = self.root
            # insert the word reversed, so a query can walk backward from the newest char
            for ch in reversed(w):
                if ch not in node.children:
                    node.children[ch] = TrieNode()
                node = node.children[ch]
            node.is_word = True
        self.max_len = max_len
        self.stream = []  # recent characters, newest last

    def query(self, letter: str) -> bool:
        self.stream.append(letter)
        if len(self.stream) > self.max_len:
            self.stream.pop(0)

        node = self.root
        for ch in reversed(self.stream):
            if ch not in node.children:
                return False
            node = node.children[ch]
            if node.is_word:
                return True
        return False
