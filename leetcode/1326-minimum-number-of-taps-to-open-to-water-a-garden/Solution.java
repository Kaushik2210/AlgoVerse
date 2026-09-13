class Solution {
    public int minTaps(int n, int[] ranges) {
        int[] farthest = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            int start = Math.max(0, i - ranges[i]);
            int end = Math.min(n, i + ranges[i]);
            farthest[start] = Math.max(farthest[start], end);
        }

        int count = 0;
        int currentEnd = 0;
        int nextEnd = 0;
        int s = 0;
        while (currentEnd < n) {
            while (s <= currentEnd && s <= n) {
                nextEnd = Math.max(nextEnd, farthest[s]);
                s++;
            }
            if (nextEnd <= currentEnd) {
                return -1;
            }
            count++;
            currentEnd = nextEnd;
        }
        return count;
    }
}
