from typing import Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        # Find the middle with slow/fast pointers.
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        # Reverse the second half in place.
        prev = None
        curr = slow
        while curr:
            curr.next, prev, curr = prev, curr, curr.next

        # Walk the first half and the reversed second half together.
        max_sum = 0
        first = head
        second = prev
        while second:
            max_sum = max(max_sum, first.val + second.val)
            first = first.next
            second = second.next

        return max_sum
