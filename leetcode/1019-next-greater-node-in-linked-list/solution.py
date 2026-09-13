from typing import List, Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def nextLargerNodes(self, head: Optional[ListNode]) -> List[int]:
        values = []
        node = head
        while node:
            values.append(node.val)
            node = node.next

        result = [0] * len(values)
        stack = []  # indices whose next greater value hasn't been found yet

        for i, val in enumerate(values):
            while stack and values[stack[-1]] < val:
                result[stack.pop()] = val
            stack.append(i)

        return result
