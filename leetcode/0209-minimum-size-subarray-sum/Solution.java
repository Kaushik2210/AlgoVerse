class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        long windowSum = 0;
        int best = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            windowSum += nums[right];
            while (windowSum >= target) {
                best = Math.min(best, right - left + 1);
                windowSum -= nums[left];
                left++;
            }
        }

        return best == Integer.MAX_VALUE ? 0 : best;
    }
}
