class Solution {
    public int[] singleNumber(int[] nums) {
        int xorAll = 0;
        for (int n : nums) {
            xorAll ^= n;
        }

        int diffBit = xorAll & (-xorAll);

        int a = 0;
        for (int n : nums) {
            if ((n & diffBit) != 0) {
                a ^= n;
            }
        }

        int b = xorAll ^ a;
        return new int[]{a, b};
    }
}
