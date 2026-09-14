import random
from typing import List


class Solution:
    def __init__(self, n: int, blacklist: List[int]):
        self.bound = n - len(blacklist)
        blacklisted = set(blacklist)
        self.remap = {}

        # Whitelisted numbers at or above self.bound are the only things
        # we can remap a "bad" number in [0, bound) onto.
        next_whitelisted = self.bound
        for b in blacklist:
            if b < self.bound:
                while next_whitelisted in blacklisted:
                    next_whitelisted += 1
                self.remap[b] = next_whitelisted
                next_whitelisted += 1

    def pick(self) -> int:
        x = random.randrange(self.bound)
        return self.remap.get(x, x)


# Your Solution object will be instantiated and called as such:
# obj = Solution(n, blacklist)
# param_1 = obj.pick()
