from typing import List


# """
# This is the interface that allows for creating nested lists.
# You should not implement it, or speculate about its implementation
# """
# class NestedInteger:
#     def isInteger(self) -> bool:
#         """
#         @return True if this NestedInteger holds a single integer, rather than a nested list.
#         """
#
#     def getInteger(self) -> int:
#         """
#         @return the single integer that this NestedInteger holds, if it holds a single integer
#         Return None if this NestedInteger holds a nested list
#         """
#
#     def getList(self) -> [NestedInteger]:
#         """
#         @return the nested list that this NestedInteger holds, if it holds a nested list
#         Return None if this NestedInteger holds a single integer
#         """


class Solution:
    def depthSumInverse(self, nestedList: List['NestedInteger']) -> int:
        def max_depth(items, depth):
            deepest = depth
            for item in items:
                if not item.isInteger():
                    deepest = max(deepest, max_depth(item.getList(), depth + 1))
            return deepest

        bottom = max_depth(nestedList, 1)

        def helper(items, depth):
            total = 0
            for item in items:
                if item.isInteger():
                    total += item.getInteger() * (bottom - depth + 1)
                else:
                    total += helper(item.getList(), depth + 1)
            return total

        return helper(nestedList, 1)
