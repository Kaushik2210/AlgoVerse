import random


class _Node:
    __slots__ = ("val", "forward")

    def __init__(self, val, level):
        self.val = val
        self.forward = [None] * (level + 1)


class Skiplist:
    MAX_LEVEL = 16
    P = 0.5

    def __init__(self):
        self.head = _Node(-1, self.MAX_LEVEL)
        self.level = 0

    def _random_level(self):
        lvl = 0
        while random.random() < self.P and lvl < self.MAX_LEVEL:
            lvl += 1
        return lvl

    def _find_predecessors(self, target):
        # for each level, the last node whose value is strictly less than target
        update = [self.head] * (self.MAX_LEVEL + 1)
        cur = self.head
        for i in range(self.level, -1, -1):
            while cur.forward[i] and cur.forward[i].val < target:
                cur = cur.forward[i]
            update[i] = cur
        return update

    def search(self, target: int) -> bool:
        update = self._find_predecessors(target)
        candidate = update[0].forward[0]
        return candidate is not None and candidate.val == target

    def add(self, num: int) -> None:
        update = self._find_predecessors(num)
        new_level = self._random_level()
        if new_level > self.level:
            for i in range(self.level + 1, new_level + 1):
                update[i] = self.head
            self.level = new_level
        new_node = _Node(num, new_level)
        for i in range(new_level + 1):
            new_node.forward[i] = update[i].forward[i]
            update[i].forward[i] = new_node

    def erase(self, num: int) -> bool:
        update = self._find_predecessors(num)
        candidate = update[0].forward[0]
        if candidate is None or candidate.val != num:
            return False
        for i in range(self.level + 1):
            if update[i].forward[i] is not candidate:
                break
            update[i].forward[i] = candidate.forward[i]
        while self.level > 0 and self.head.forward[self.level] is None:
            self.level -= 1
        return True


# Your Skiplist object will be instantiated and called as such:
# obj = Skiplist()
# param_1 = obj.search(target)
# obj.add(num)
# param_3 = obj.erase(num)
