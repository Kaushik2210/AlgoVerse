class ProductOfNumbers:
    def __init__(self):
        # prefix[i] = product of all numbers added so far, up to the i-th add
        self.prefix = [1]

    def add(self, num: int) -> None:
        if num == 0:
            # a zero breaks every running product that would span it,
            # so just restart the prefix list from here
            self.prefix = [1]
        else:
            self.prefix.append(self.prefix[-1] * num)

    def getProduct(self, k: int) -> int:
        if k >= len(self.prefix):
            # the window would have to reach past a zero we reset on
            return 0
        return self.prefix[-1] // self.prefix[len(self.prefix) - 1 - k]


# Your ProductOfNumbers object will be instantiated and called as such:
# obj = ProductOfNumbers()
# obj.add(num)
# param_2 = obj.getProduct(k)
