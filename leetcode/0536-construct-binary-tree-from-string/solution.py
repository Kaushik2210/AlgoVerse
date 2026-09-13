from typing import Optional


# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def str2tree(self, s: str) -> Optional[TreeNode]:
        if not s:
            return None

        self.i = 0

        def parse_int():
            start = self.i
            if s[self.i] == '-':
                self.i += 1
            while self.i < len(s) and s[self.i].isdigit():
                self.i += 1
            return int(s[start:self.i])

        def parse_node():
            val = parse_int()
            node = TreeNode(val)

            if self.i < len(s) and s[self.i] == '(':
                self.i += 1  # consume '('
                node.left = parse_node()
                self.i += 1  # consume ')'

            if self.i < len(s) and s[self.i] == '(':
                self.i += 1  # consume '('
                node.right = parse_node()
                self.i += 1  # consume ')'

            return node

        return parse_node()
