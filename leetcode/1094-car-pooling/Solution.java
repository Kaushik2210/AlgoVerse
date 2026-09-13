class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        int[] delta = new int[1001];
        for (int[] trip : trips) {
            delta[trip[1]] += trip[0];
            delta[trip[2]] -= trip[0];
        }

        int passengers = 0;
        for (int change : delta) {
            passengers += change;
            if (passengers > capacity) {
                return false;
            }
        }
        return true;
    }
}
