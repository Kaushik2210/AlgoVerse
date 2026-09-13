from typing import List, Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        values: List[str] = []

        def preorder(node: Optional[TreeNode]) -> None:
            if node is None:
                return
            values.append(str(node.val))
            preorder(node.left)
            preorder(node.right)

        preorder(root)
        return ','.join(values)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        if not data:
            return None

        values = [int(v) for v in data.split(',')]
        self.index = 0

        def build(lower: int, upper: int) -> Optional[TreeNode]:
            if self.index == len(values) or not (lower < values[self.index] < upper):
                return None

            val = values[self.index]
            self.index += 1
            node = TreeNode(val)
            node.left = build(lower, val)
            node.right = build(val, upper)
            return node

        return build(float('-inf'), float('inf'))


# Your Codec object will be instantiated and called as such:
# ser = Codec()
# deser = Codec()
# tree = deser.deserialize(ser.serialize(root))
