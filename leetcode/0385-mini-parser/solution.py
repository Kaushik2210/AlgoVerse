# """
# This is the interface that allows for creating nested lists.
# You should not implement it, or speculate about its implementation
# """
# class NestedInteger:
#     def __init__(self, value=None):
#         """
#         If value is not specified, initializes an empty list.
#         Otherwise initializes a single integer equal to value.
#         """
#
#     def isInteger(self) -> bool:
#         """
#         @return True if this NestedInteger holds a single integer, rather than a nested list.
#         """
#
#     def add(self, elem) -> None:
#         """
#         Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
#         """
#
#     def setInteger(self, value) -> None:
#         """
#         Set this NestedInteger to hold a single integer equal to value.
#         """
#
#     def getInteger(self) -> int:
#         """
#         @return the single integer that this NestedInteger holds, if it holds a single integer
#         Return None if this NestedInteger holds a nested list
#         """
#
#     def getList(self) -> [object]:
#         """
#         @return the nested list that this NestedInteger holds, if it holds a nested list
#         Return None if this NestedInteger holds a single integer
#         """


# LeetCode supplies a working NestedInteger at judge time; this local implementation
# exists only so the parser below can be exercised and tested on its own.
class NestedInteger:
    def __init__(self, value=None):
        self._value = value
        self._list = None if value is not None else []

    def isInteger(self):
        return self._value is not None

    def add(self, elem):
        if self._list is None:
            self._list = []
        self._value = None
        self._list.append(elem)

    def setInteger(self, value):
        self._value = value
        self._list = None

    def getInteger(self):
        return self._value

    def getList(self):
        return self._list


class Solution:
    def deserialize(self, s: str) -> 'NestedInteger':
        if s[0] != '[':
            return NestedInteger(int(s))

        stack = []
        current = None
        num = ''

        for ch in s:
            if ch == '[':
                if current is not None:
                    stack.append(current)
                current = NestedInteger()
            elif ch == ']':
                if num:
                    current.add(NestedInteger(int(num)))
                    num = ''
                if stack:
                    parent = stack.pop()
                    parent.add(current)
                    current = parent
            elif ch == ',':
                if num:
                    current.add(NestedInteger(int(num)))
                    num = ''
            else:
                num += ch

        return current
