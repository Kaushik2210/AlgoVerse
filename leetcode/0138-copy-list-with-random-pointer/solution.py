from typing import Optional


# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random


class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if head is None:
            return None

        clones = {}

        node = head
        while node:
            clones[node] = Node(node.val)
            node = node.next

        node = head
        while node:
            clones[node].next = clones.get(node.next)
            clones[node].random = clones.get(node.random)
            node = node.next

        return clones[head]
