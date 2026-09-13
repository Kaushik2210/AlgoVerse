import java.util.PriorityQueue;
import java.util.Arrays;

class Solution {
    public int minimumEffortPath(int[][] heights) {
        int rows = heights.length, cols = heights[0].length;
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        int[][] effortTo = new int[rows][cols];
        for (int[] row : effortTo) Arrays.fill(row, Integer.MAX_VALUE);
        effortTo[0][0] = 0;

        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]); // min-heap on effort
        heap.offer(new int[]{0, 0, 0});

        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int effort = top[0], r = top[1], c = top[2];
            if (r == rows - 1 && c == cols - 1) return effort;
            if (effort > effortTo[r][c]) continue; // stale entry

            for (int[] d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    int step = Math.abs(heights[nr][nc] - heights[r][c]);
                    int newEffort = Math.max(effort, step);
                    if (newEffort < effortTo[nr][nc]) {
                        effortTo[nr][nc] = newEffort;
                        heap.offer(new int[]{newEffort, nr, nc});
                    }
                }
            }
        }

        return 0;
    }
}
