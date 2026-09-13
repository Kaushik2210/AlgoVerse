class Solution {
    public int deleteAndEarn(int[] nums) {
        if (nums.length == 0) {
            return 0;
        }

        int maxVal = 0;
        for (int x : nums) {
            maxVal = Math.max(maxVal, x);
        }

        long[] points = new long[maxVal + 1];
        for (int x : nums) {
            points[x] += x;
        }

        long take = 0, skip = 0;
        for (int v = 1; v <= maxVal; v++) {
            long newTake = skip + points[v];
            long newSkip = Math.max(take, skip);
            take = newTake;
            skip = newSkip;
        }

        return (int) Math.max(take, skip);
    }
}
