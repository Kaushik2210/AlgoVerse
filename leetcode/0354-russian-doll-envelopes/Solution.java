import java.util.Arrays;

class Solution {
    public int maxEnvelopes(int[][] envelopes) {
        Arrays.sort(envelopes, (a, b) -> a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]);

        int[] tails = new int[envelopes.length];
        int size = 0;
        for (int[] e : envelopes) {
            int h = e[1];
            int lo = 0, hi = size;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (tails[mid] < h) lo = mid + 1;
                else hi = mid;
            }
            tails[lo] = h;
            if (lo == size) size++;
        }
        return size;
    }
}
