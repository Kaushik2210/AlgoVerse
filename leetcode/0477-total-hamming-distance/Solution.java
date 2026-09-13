class Solution {
    public int totalHammingDistance(int[] nums) {
        int n = nums.length;
        long total = 0;
        for (int bit = 0; bit < 30; bit++) {
            int ones = 0;
            for (int num : nums) {
                ones += (num >> bit) & 1;
            }
            total += (long) ones * (n - ones);
        }
        return (int) total;
    }
}
