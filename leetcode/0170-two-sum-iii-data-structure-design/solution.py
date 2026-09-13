from collections import defaultdict


class TwoSum:
    def __init__(self):
        self.counts = defaultdict(int)

    def add(self, number: int) -> None:
        self.counts[number] += 1

    def find(self, value: int) -> bool:
        for k in self.counts:
            complement = value - k
            if complement == k:
                if self.counts[k] > 1:
                    return True
            elif complement in self.counts:
                return True
        return False


# Your TwoSum object will be instantiated and called as such:
# obj = TwoSum()
# obj.add(number)
# param_2 = obj.find(value)
