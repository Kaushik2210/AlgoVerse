import heapq
from collections import Counter


class Solution:
    def reorganizeString(self, s: str) -> str:
        n = len(s)
        if n == 0:
            return ""
        counts = Counter(s)

        max_count = max(counts.values())
        if max_count > (n + 1) // 2:
            return ""

        # Max-heap of (-count, char) so the most frequent remaining letter
        # always gets placed next, spreading it out as early as possible.
        heap = [(-cnt, ch) for ch, cnt in counts.items()]
        heapq.heapify(heap)

        result = []
        prev_cnt, prev_ch = 0, ""

        while heap:
            cnt, ch = heapq.heappop(heap)
            result.append(ch)
            cnt += 1  # one fewer remaining occurrence (cnt was negative)

            # Re-add the previous letter now that a different letter sits
            # between it and its next occurrence.
            if prev_cnt < 0:
                heapq.heappush(heap, (prev_cnt, prev_ch))

            prev_cnt, prev_ch = cnt, ch

        return "".join(result) if len(result) == n else ""
