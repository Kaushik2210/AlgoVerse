from typing import List, Optional


class TrieNode:
    __slots__ = ("children", "word")

    def __init__(self):
        self.children = {}
        self.word: Optional[str] = None


class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        root = TrieNode()
        for word in words:
            node = root
            for ch in word:
                node = node.children.setdefault(ch, TrieNode())
            node.word = word

        rows, cols = len(board), len(board[0])
        result = []

        def dfs(r: int, c: int, node: 'TrieNode') -> None:
            ch = board[r][c]
            if ch not in node.children:
                return

            child = node.children[ch]
            if child.word is not None:
                result.append(child.word)
                child.word = None  # avoid duplicate matches

            board[r][c] = '#'
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                    dfs(nr, nc, child)
            board[r][c] = ch

            if not child.children:
                del node.children[ch]

        for r in range(rows):
            for c in range(cols):
                dfs(r, c, root)

        return result
