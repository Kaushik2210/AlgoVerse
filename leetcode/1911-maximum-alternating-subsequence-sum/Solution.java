class Solution {
    public long maxAlternatingSum(int[] nums) {
        long even = 0, odd = 0;
        for (int x : nums) {
            long newEven = Math.max(even, odd + x);
            long newOdd = Math.max(odd, even - x);
            even = newEven;
            odd = newOdd;
        }
        return even;
    }
}
