class Solution {
    public int maxSubarraySumCircular(int[] nums) {
        int total = 0;
        int curMax = 0, maxSum = nums[0];
        int curMin = 0, minSum = nums[0];

        for (int x : nums) {
            total += x;
            curMax = Math.max(curMax, 0) + x;
            maxSum = Math.max(maxSum, curMax);
            curMin = Math.min(curMin, 0) + x;
            minSum = Math.min(minSum, curMin);
        }

        if (maxSum < 0) {
            return maxSum;
        }

        return Math.max(maxSum, total - minSum);
    }
}
