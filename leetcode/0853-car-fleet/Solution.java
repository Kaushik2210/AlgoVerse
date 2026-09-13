import java.util.Arrays;
import java.util.Comparator;

class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        Integer[] idx = new Integer[n];
        for (int i = 0; i < n; i++) {
            idx[i] = i;
        }
        // closest to target first
        Arrays.sort(idx, Comparator.comparingInt((Integer i) -> position[i]).reversed());

        int fleets = 0;
        double currentTime = 0.0;

        for (int i : idx) {
            double timeToTarget = (double) (target - position[i]) / speed[i];
            if (timeToTarget > currentTime) {
                fleets++;
                currentTime = timeToTarget;
            }
        }

        return fleets;
    }
}
