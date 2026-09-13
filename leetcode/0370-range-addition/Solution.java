class Solution {
    public int[] getModifiedArray(int length, int[][] updates) {
        int[] diff = new int[length + 1];
        for (int[] update : updates) {
            int start = update[0];
            int end = update[1];
            int inc = update[2];
            diff[start] += inc;
            diff[end + 1] -= inc;
        }

        int[] result = new int[length];
        int running = 0;
        for (int i = 0; i < length; i++) {
            running += diff[i];
            result[i] = running;
        }
        return result;
    }
}
