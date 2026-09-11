class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int bestProfit = 0;

        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > bestProfit) {
                bestProfit = price - minPrice;
            }
        }

        return bestProfit;
    }
}
