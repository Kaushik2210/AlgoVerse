import java.util.HashMap;
import java.util.Map;

class Solution {
    public int numberOfBoomerangs(int[][] points) {
        int total = 0;

        for (int[] p0 : points) {
            Map<Integer, Integer> distCount = new HashMap<>();
            for (int[] p1 : points) {
                int dx = p1[0] - p0[0];
                int dy = p1[1] - p0[1];
                int d = dx * dx + dy * dy;
                distCount.merge(d, 1, Integer::sum);
            }

            for (int count : distCount.values()) {
                total += count * (count - 1);
            }
        }

        return total;
    }
}
