import heapq


class DinnerPlates:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.stacks = []  # list of stacks (each a python list)
        # Min-heap of stack indices that MIGHT have room to push into.
        # Entries can go stale (index removed / stack filled up since being
        # added) -- they're just skipped lazily whenever they surface.
        self.available = []

    def push(self, val: int) -> None:
        # Drop stale heap entries: indices that no longer exist or are full.
        while self.available and (
            self.available[0] >= len(self.stacks)
            or len(self.stacks[self.available[0]]) >= self.capacity
        ):
            heapq.heappop(self.available)

        if not self.available:
            index = len(self.stacks)
            self.stacks.append([])
        else:
            index = self.available[0]

        self.stacks[index].append(val)

        # Still room after this push? Keep it around for next time.
        if len(self.stacks[index]) < self.capacity:
            heapq.heappush(self.available, index)

    def pop(self) -> int:
        # Trim any empty stacks off the end (only the ones actually at the
        # end matter for "rightmost non-empty stack").
        while self.stacks and not self.stacks[-1]:
            self.stacks.pop()

        if not self.stacks:
            return -1

        return self.popAtStack(len(self.stacks) - 1)

    def popAtStack(self, index: int) -> int:
        if index >= len(self.stacks) or not self.stacks[index]:
            return -1

        val = self.stacks[index].pop()
        heapq.heappush(self.available, index)
        return val


# Your DinnerPlates object will be instantiated and called as such:
# obj = DinnerPlates(capacity)
# obj.push(val)
# param_2 = obj.pop()
# param_3 = obj.popAtStack(index)
