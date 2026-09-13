import java.util.Random;

class Solution {
    private final int[] prefix;
    private final int total;
    private final Random rand = new Random();

    public Solution(int[] w) {
        prefix = new int[w.length];
        int sum = 0;
        for (int i = 0; i < w.length; i++) {
            sum += w[i];
            prefix[i] = sum;
        }
        total = sum;
    }

    public int pickIndex() {
        int target = rand.nextInt(total) + 1;
        int lo = 0, hi = prefix.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (prefix[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(w);
 * int param_1 = obj.pickIndex();
 */
