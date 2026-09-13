class Solution {
    public int maxProfit(int[] prices, int fee) {
        int hold = -prices[0];
        int cash = 0;

        for (int i = 1; i < prices.length; i++) {
            int prevHold = hold, prevCash = cash;
            hold = Math.max(prevHold, prevCash - prices[i]);
            cash = Math.max(prevCash, prevHold + prices[i] - fee);
        }

        return cash;
    }
}
