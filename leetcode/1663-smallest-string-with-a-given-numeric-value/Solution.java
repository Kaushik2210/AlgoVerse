class Solution {
    public String getSmallestString(int n, int k) {
        char[] result = new char[n];
        java.util.Arrays.fill(result, 'a');
        int remaining = k - n;

        for (int i = n - 1; i >= 0 && remaining > 0; i--) {
            int add = Math.min(25, remaining);
            result[i] = (char) ('a' + add);
            remaining -= add;
        }

        return new String(result);
    }
}
