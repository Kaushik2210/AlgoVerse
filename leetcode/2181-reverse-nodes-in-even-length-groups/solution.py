from typing import Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def reverseEvenLengthGroups(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = head  # tail of the last processed group; group 1 (size 1) is untouched
        group_len = 2
        group_start = head.next

        while group_start:
            # Find how many nodes actually exist in this group (may be
            # shorter than group_len if the list runs out).
            count = 0
            node = group_start
            while node and count < group_len:
                node = node.next
                count += 1
            group_end = node  # first node AFTER this group (or None)

            if count % 2 == 0:
                # Reverse this group's `count` nodes in place.
                reverse_prev = group_end
                curr = group_start
                for _ in range(count):
                    next_node = curr.next
                    curr.next = reverse_prev
                    reverse_prev = curr
                    curr = next_node
                prev.next = reverse_prev
                prev = group_start  # group_start is now the tail of the (reversed) group
            else:
                # Leave it as is; just advance prev to this group's tail.
                curr = group_start
                for _ in range(count - 1):
                    curr = curr.next
                prev = curr

            group_start = group_end
            group_len += 1

        return head
