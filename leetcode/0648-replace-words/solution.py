from typing import List, Dict


class TrieNode:
    def __init__(self):
        self.children: Dict[str, 'TrieNode'] = {}
        self.is_end = False


class Solution:
    def replaceWords(self, dictionary: List[str], sentence: str) -> str:
        root = TrieNode()
        for word in dictionary:
            node = root
            for ch in word:
                node = node.children.setdefault(ch, TrieNode())
            node.is_end = True

        def find_root(word: str) -> str:
            node = root
            for i, ch in enumerate(word):
                if ch not in node.children:
                    return word
                node = node.children[ch]
                if node.is_end:
                    return word[:i + 1]
            return word

        return " ".join(find_root(word) for word in sentence.split(" "))
