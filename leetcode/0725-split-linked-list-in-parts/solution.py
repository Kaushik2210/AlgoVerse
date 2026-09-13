from typing import List, Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def splitListToParts(self, head: Optional[ListNode], k: int) -> List[Optional[ListNode]]:
        length = 0
        node = head
        while node:
            length += 1
            node = node.next

        base_size, extra = divmod(length, k)

        result = []
        curr = head
        for i in range(k):
            part_size = base_size + (1 if i < extra else 0)
            if part_size == 0:
                result.append(None)
                continue

            part_head = curr
            for _ in range(part_size - 1):
                curr = curr.next
            next_part = curr.next
            curr.next = None
            curr = next_part
            result.append(part_head)

        return result
