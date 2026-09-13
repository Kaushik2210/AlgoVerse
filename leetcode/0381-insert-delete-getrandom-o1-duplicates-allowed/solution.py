import random
from collections import defaultdict


class RandomizedCollection:
    def __init__(self):
        self.values = []
        self.indexes = defaultdict(set)

    def insert(self, val: int) -> bool:
        is_new = len(self.indexes[val]) == 0
        self.indexes[val].add(len(self.values))
        self.values.append(val)
        return is_new

    def remove(self, val: int) -> bool:
        if not self.indexes[val]:
            return False

        remove_idx = next(iter(self.indexes[val]))
        self.indexes[val].discard(remove_idx)  # this occurrence of val is gone

        last_idx = len(self.values) - 1
        last_val = self.values[last_idx]

        if remove_idx != last_idx:
            self.values[remove_idx] = last_val
            # the value that used to live at last_idx now lives at remove_idx
            self.indexes[last_val].discard(last_idx)
            self.indexes[last_val].add(remove_idx)

        self.values.pop()
        return True

    def getRandom(self) -> int:
        return random.choice(self.values)


# Your RandomizedCollection object will be instantiated and called as such:
# obj = RandomizedCollection()
# param_1 = obj.insert(val)
# param_2 = obj.remove(val)
# param_3 = obj.getRandom()
