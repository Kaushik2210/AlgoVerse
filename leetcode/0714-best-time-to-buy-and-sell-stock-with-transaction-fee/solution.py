from typing import List


class Solution:
    def maxProfit(self, prices: List[int], fee: int) -> int:
        hold = -prices[0]
        cash = 0

        for price in prices[1:]:
            prev_hold, prev_cash = hold, cash
            hold = max(prev_hold, prev_cash - price)
            cash = max(prev_cash, prev_hold + price - fee)

        return cash
