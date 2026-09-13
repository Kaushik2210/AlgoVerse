from typing import List


class Solution:
    def maxProfit(self, k: int, prices: List[int]) -> int:
        n = len(prices)
        if n == 0:
            return 0

        # If k is large enough, cap doesn't matter: unlimited transactions.
        if k >= n // 2:
            profit = 0
            for i in range(1, n):
                if prices[i] > prices[i - 1]:
                    profit += prices[i] - prices[i - 1]
            return profit

        hold = [float("-inf")] * (k + 1)
        cash = [0] * (k + 1)

        for price in prices:
            for t in range(1, k + 1):
                hold[t] = max(hold[t], cash[t - 1] - price)
                cash[t] = max(cash[t], hold[t] + price)

        return cash[k]
