class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        return atMost(nums, goal) - atMost(nums, goal - 1);
    }

    private int atMost(int[] nums, int k) {
        if (k < 0) {
            return 0;
        }
        int left = 0;
        int total = 0;
        int count = 0;
        for (int right = 0; right < nums.length; right++) {
            total += nums[right];
            while (total > k) {
                total -= nums[left];
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
}
