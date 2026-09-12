from typing import Optional


# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        stack1 = self._to_stack(l1)
        stack2 = self._to_stack(l2)

        carry = 0
        head = None  # result list, built by prepending

        while stack1 or stack2 or carry:
            digit_sum = carry
            if stack1:
                digit_sum += stack1.pop()
            if stack2:
                digit_sum += stack2.pop()

            carry, digit = divmod(digit_sum, 10)
            node = ListNode(digit)
            node.next = head
            head = node

        return head

    def _to_stack(self, node: Optional[ListNode]) -> list:
        stack = []
        while node:
            stack.append(node.val)
            node = node.next
        return stack
