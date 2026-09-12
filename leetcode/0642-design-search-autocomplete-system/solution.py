from typing import Dict, List


class TrieNode:
    def __init__(self):
        self.children: Dict[str, 'TrieNode'] = {}
        # every sentence that passes through this node, mapped to its frequency
        self.sentence_counts: Dict[str, int] = {}


class AutocompleteSystem:
    def __init__(self, sentences: List[str], times: List[int]):
        self.root = TrieNode()
        self.freq: Dict[str, int] = {}
        for sentence, time in zip(sentences, times):
            self.freq[sentence] = time
            self._insert(sentence, time)

        self.current_prefix = ""
        self.current_node = self.root
        self.fell_off = False

    def _insert(self, sentence: str, count: int) -> None:
        node = self.root
        for ch in sentence:
            node = node.children.setdefault(ch, TrieNode())
            node.sentence_counts[sentence] = count

    def input(self, c: str) -> List[str]:
        if c == '#':
            sentence = self.current_prefix
            self.freq[sentence] = self.freq.get(sentence, 0) + 1
            self._insert(sentence, self.freq[sentence])
            self.current_prefix = ""
            self.current_node = self.root
            self.fell_off = False
            return []

        self.current_prefix += c
        if self.fell_off:
            return []

        if c not in self.current_node.children:
            self.fell_off = True
            return []

        self.current_node = self.current_node.children[c]
        candidates = list(self.current_node.sentence_counts.items())
        candidates.sort(key=lambda item: (-item[1], item[0]))
        return [sentence for sentence, _ in candidates[:3]]
