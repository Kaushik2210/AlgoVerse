class Solution {
    public int hammingDistance(int x, int y) {
        int v = x ^ y;
        int count = 0;
        while (v != 0) {
            v &= v - 1;
            count++;
        }
        return count;
    }
}
