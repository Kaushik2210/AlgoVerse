from typing import List
from collections import Counter


class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        counts = Counter(tasks)
        max_count = max(counts.values())
        num_max = sum(1 for c in counts.values() if c == max_count)

        # (max_count - 1) full groups of size (n + 1), plus num_max tasks at the very end
        frame = (max_count - 1) * (n + 1) + num_max

        return max(frame, len(tasks))
