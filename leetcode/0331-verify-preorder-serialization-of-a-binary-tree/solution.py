class Solution:
    def isValidSerialization(self, preorder: str) -> bool:
        nodes = preorder.split(',')
        slots = 1  # number of open "slots" available for the next node

        for node in nodes:
            if slots <= 0:
                return False
            slots -= 1  # this node fills one open slot
            if node != '#':
                slots += 2  # a real node opens two new slots for its children

        return slots == 0
