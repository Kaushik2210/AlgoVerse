import java.util.Arrays;

class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;

        for (int n : nums) {
            int lo = 0, hi = size;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (tails[mid] < n) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            tails[lo] = n;
            if (lo == size) {
                size++;
            }
        }

        return size;
    }
}
