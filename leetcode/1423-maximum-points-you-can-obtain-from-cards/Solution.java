class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int n = cardPoints.length;
        int total = 0;
        for (int point : cardPoints) {
            total += point;
        }

        int windowSize = n - k;
        if (windowSize == 0) {
            return total;
        }

        int window = 0;
        for (int i = 0; i < windowSize; i++) {
            window += cardPoints[i];
        }

        int minWindow = window;
        for (int i = windowSize; i < n; i++) {
            window += cardPoints[i] - cardPoints[i - windowSize];
            minWindow = Math.min(minWindow, window);
        }

        return total - minWindow;
    }
}
