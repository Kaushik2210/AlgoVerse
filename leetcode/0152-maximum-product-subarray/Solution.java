class Solution {
    public int maxProduct(int[] nums) {
        int result = nums[0];
        int currMax = nums[0], currMin = nums[0];

        for (int i = 1; i < nums.length; i++) {
            int num = nums[i];
            int candidate1 = num * currMax;
            int candidate2 = num * currMin;

            currMax = Math.max(num, Math.max(candidate1, candidate2));
            currMin = Math.min(num, Math.min(candidate1, candidate2));

            result = Math.max(result, currMax);
        }

        return result;
    }
}
