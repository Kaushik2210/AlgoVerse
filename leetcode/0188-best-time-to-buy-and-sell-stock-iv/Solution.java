import java.util.Arrays;

class Solution {
    public int maxProfit(int k, int[] prices) {
        int n = prices.length;
        if (n == 0) {
            return 0;
        }

        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) {
                    profit += prices[i] - prices[i - 1];
                }
            }
            return profit;
        }

        int[] hold = new int[k + 1];
        int[] cash = new int[k + 1];
        Arrays.fill(hold, Integer.MIN_VALUE / 2);

        for (int price : prices) {
            for (int t = 1; t <= k; t++) {
                hold[t] = Math.max(hold[t], cash[t - 1] - price);
                cash[t] = Math.max(cash[t], hold[t] + price);
            }
        }

        return cash[k];
    }
}
