import heapq
from collections import Counter, deque


class Solution:
    def rearrangeString(self, s: str, k: int) -> str:
        if k <= 1:
            return s

        n = len(s)
        counts = Counter(s)

        heap = [(-cnt, ch) for ch, cnt in counts.items()]
        heapq.heapify(heap)

        # Holds characters that were just placed, each paired with the step
        # index at which they become eligible to be placed again (current
        # step + k). A plain queue works because entries are added in
        # non-decreasing order of their release step.
        waiting = deque()  # (release_step, count, char)
        result = []

        for step in range(n):
            # Release anything whose k-step cooldown has expired.
            if waiting and waiting[0][0] == step:
                _, cnt, ch = waiting.popleft()
                heapq.heappush(heap, (cnt, ch))

            if not heap:
                return ""

            cnt, ch = heapq.heappop(heap)
            result.append(ch)
            cnt += 1  # one fewer remaining occurrence (cnt was negative)

            if cnt < 0:
                waiting.append((step + k, cnt, ch))

        return "".join(result)
