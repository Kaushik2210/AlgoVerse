import java.util.Arrays;
import java.util.Comparator;

class Solution {
    public int twoCitySchedCost(int[][] costs) {
        Arrays.sort(costs, Comparator.comparingInt(c -> c[0] - c[1]));
        int n = costs.length / 2;
        int total = 0;
        for (int i = 0; i < n; i++) {
            total += costs[i][0];
        }
        for (int i = n; i < 2 * n; i++) {
            total += costs[i][1];
        }
        return total;
    }
}
