from typing import List


class Solution:
    def maxScore(self, cardPoints: List[int], k: int) -> int:
        n = len(cardPoints)
        total = sum(cardPoints)
        window_size = n - k
        if window_size == 0:
            return total

        window = sum(cardPoints[:window_size])
        min_window = window
        for i in range(window_size, n):
            window += cardPoints[i] - cardPoints[i - window_size]
            min_window = min(min_window, window)

        return total - min_window
