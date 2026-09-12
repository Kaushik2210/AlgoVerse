from typing import Dict


class TrieNode:
    def __init__(self):
        self.children: Dict[str, 'TrieNode'] = {}
        self.sum = 0


class MapSum:
    def __init__(self):
        self.root = TrieNode()
        self.key_values: Dict[str, int] = {}

    def insert(self, key: str, val: int) -> None:
        delta = val - self.key_values.get(key, 0)
        self.key_values[key] = val

        node = self.root
        node.sum += delta
        for ch in key:
            node = node.children.setdefault(ch, TrieNode())
            node.sum += delta

    def sum(self, prefix: str) -> int:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return 0
            node = node.children[ch]
        return node.sum
