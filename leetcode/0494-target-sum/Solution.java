class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int total = 0;
        for (int num : nums) {
            total += num;
        }
        if (Math.abs(target) > total || (total + target) % 2 != 0) {
            return 0;
        }

        int p = (total + target) / 2;
        int[] dp = new int[p + 1];
        dp[0] = 1;

        for (int num : nums) {
            for (int s = p; s >= num; s--) {
                dp[s] += dp[s - num];
            }
        }

        return dp[p];
    }
}
