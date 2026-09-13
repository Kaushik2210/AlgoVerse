from typing import List


class _Node:
    def __init__(self):
        self.children = {}  # name -> _Node
        self.is_file = False
        self.content = ""


class FileSystem:
    def __init__(self):
        self.root = _Node()

    def _split(self, path: str):
        return [p for p in path.split('/') if p]

    def _walk(self, parts, create_dirs=False):
        node = self.root
        for p in parts:
            if p not in node.children:
                if create_dirs:
                    node.children[p] = _Node()
                else:
                    return None
            node = node.children[p]
        return node

    def ls(self, path: str) -> List[str]:
        parts = self._split(path)
        node = self._walk(parts)
        if node.is_file:
            return [parts[-1]]
        return sorted(node.children.keys())

    def mkdir(self, path: str) -> None:
        parts = self._split(path)
        self._walk(parts, create_dirs=True)

    def addContentToFile(self, filePath: str, content: str) -> None:
        parts = self._split(filePath)
        node = self._walk(parts, create_dirs=True)
        node.is_file = True
        node.content += content

    def readContentFromFile(self, filePath: str) -> str:
        parts = self._split(filePath)
        node = self._walk(parts)
        return node.content


# Your FileSystem object will be instantiated and called as such:
# obj = FileSystem()
# param_1 = obj.ls(path)
# obj.mkdir(path)
# obj.addContentToFile(filePath,content)
# param_4 = obj.readContentFromFile(filePath)
