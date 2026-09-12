from typing import Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        less_dummy = ListNode()
        greater_dummy = ListNode()
        less_tail = less_dummy
        greater_tail = greater_dummy

        node = head
        while node:
            if node.val < x:
                less_tail.next = node
                less_tail = less_tail.next
            else:
                greater_tail.next = node
                greater_tail = greater_tail.next
            node = node.next

        greater_tail.next = None
        less_tail.next = greater_dummy.next

        return less_dummy.next
