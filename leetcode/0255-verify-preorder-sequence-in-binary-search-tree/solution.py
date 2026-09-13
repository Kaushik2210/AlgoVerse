from typing import List


class Solution:
    def verifyPreorder(self, preorder: List[int]) -> bool:
        stack = []
        lower_bound = float('-inf')

        for num in preorder:
            if num < lower_bound:
                return False
            # popping the stack while it decreases means we've finished a left
            # subtree and are now descending into a right subtree; every value
            # from here on must be greater than the root of that subtree
            while stack and stack[-1] < num:
                lower_bound = stack.pop()
            stack.append(num)

        return True
