from typing import Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def removeZeroSumSublists(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head

        # First pass: record the LAST node seen at each running prefix sum.
        # If the same prefix sum shows up twice, every node between those
        # two occurrences sums to zero.
        prefix_sum = 0
        last_seen = {0: dummy}
        node = head
        while node:
            prefix_sum += node.val
            last_seen[prefix_sum] = node
            node = node.next

        # Second pass: rebuild the list by jumping straight from each node
        # to whatever the LAST node with the same prefix sum was, which
        # splices out any zero-sum run in between.
        prefix_sum = 0
        node = dummy
        while node:
            prefix_sum += node.val
            node.next = last_seen[prefix_sum].next
            node = node.next

        return dummy.next
