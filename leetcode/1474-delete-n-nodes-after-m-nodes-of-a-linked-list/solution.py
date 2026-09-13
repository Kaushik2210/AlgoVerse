from typing import Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def deleteNodes(self, head: Optional[ListNode], m: int, n: int) -> Optional[ListNode]:
        curr = head

        while curr:
            # Keep m nodes.
            for _ in range(m - 1):
                if not curr:
                    return head
                curr = curr.next
            if not curr:
                return head

            # Delete the next n nodes.
            to_delete = curr.next
            for _ in range(n):
                if not to_delete:
                    break
                to_delete = to_delete.next
            curr.next = to_delete
            curr = to_delete

        return head
