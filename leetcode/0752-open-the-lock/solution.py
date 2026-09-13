from collections import deque
from typing import List


class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        dead = set(deadends)
        if "0000" in dead:
            return -1
        if target == "0000":
            return 0

        visited = {"0000"}
        queue = deque([("0000", 0)])

        while queue:
            state, steps = queue.popleft()
            for i in range(4):
                digit = int(state[i])
                for delta in (-1, 1):
                    next_digit = (digit + delta) % 10
                    next_state = state[:i] + str(next_digit) + state[i + 1:]
                    if next_state in dead or next_state in visited:
                        continue
                    if next_state == target:
                        return steps + 1
                    visited.add(next_state)
                    queue.append((next_state, steps + 1))

        return -1
