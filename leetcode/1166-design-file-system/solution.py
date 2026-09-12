from typing import Dict, Optional


class TrieNode:
    def __init__(self):
        self.children: Dict[str, 'TrieNode'] = {}
        self.value: Optional[int] = None
        self.exists = False


class FileSystem:
    def __init__(self):
        self.root = TrieNode()
        self.root.exists = True  # the root "/" always exists implicitly

    def createPath(self, path: str, value: int) -> bool:
        parts = path.split('/')[1:]  # split("/a/b") -> ['', 'a', 'b']
        if not parts:
            return False

        node = self.root
        for part in parts[:-1]:
            if part not in node.children or not node.children[part].exists:
                return False
            node = node.children[part]

        last = parts[-1]
        if last in node.children and node.children[last].exists:
            return False

        child = node.children.setdefault(last, TrieNode())
        child.exists = True
        child.value = value
        return True

    def get(self, path: str) -> int:
        parts = path.split('/')[1:]
        node = self.root
        for part in parts:
            if part not in node.children or not node.children[part].exists:
                return -1
            node = node.children[part]
        return node.value if node.value is not None else -1
