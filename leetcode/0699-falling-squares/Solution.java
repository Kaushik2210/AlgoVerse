import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> fallingSquares(int[][] positions) {
        List<int[]> placed = new ArrayList<>(); // {left, right, top}
        List<Integer> result = new ArrayList<>();
        int maxHeightSoFar = 0;

        for (int[] pos : positions) {
            int left = pos[0];
            int size = pos[1];
            int right = left + size;

            int base = 0;
            for (int[] p : placed) {
                if (p[0] < right && left < p[1]) {
                    base = Math.max(base, p[2]);
                }
            }
            int top = base + size;
            placed.add(new int[]{left, right, top});
            maxHeightSoFar = Math.max(maxHeightSoFar, top);
            result.add(maxHeightSoFar);
        }

        return result;
    }
}
