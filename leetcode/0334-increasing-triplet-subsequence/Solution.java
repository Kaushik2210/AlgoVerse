class Solution {
    public boolean increasingTriplet(int[] nums) {
        long first = Long.MAX_VALUE, second = Long.MAX_VALUE;

        for (int num : nums) {
            if (num <= first) {
                first = num;
            } else if (num <= second) {
                second = num;
            } else {
                return true;
            }
        }

        return false;
    }
}
