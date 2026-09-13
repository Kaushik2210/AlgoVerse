class Solution {
    public int findNumberOfLIS(int[] nums) {
        int n = nums.length;
        int[] length = new int[n];
        int[] count = new int[n];
        java.util.Arrays.fill(length, 1);
        java.util.Arrays.fill(count, 1);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    if (length[j] + 1 > length[i]) {
                        length[i] = length[j] + 1;
                        count[i] = count[j];
                    } else if (length[j] + 1 == length[i]) {
                        count[i] += count[j];
                    }
                }
            }
        }

        int maxLen = 0;
        for (int l : length) maxLen = Math.max(maxLen, l);

        int total = 0;
        for (int i = 0; i < n; i++) {
            if (length[i] == maxLen) total += count[i];
        }
        return total;
    }
}
