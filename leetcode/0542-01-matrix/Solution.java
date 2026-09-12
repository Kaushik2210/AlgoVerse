import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[][] updateMatrix(int[][] mat) {
        int rows = mat.length, cols = mat[0].length;
        int[][] dist = new int[rows][cols];
        for (int[] row : dist) {
            java.util.Arrays.fill(row, -1);
        }

        Deque<int[]> queue = new ArrayDeque<>();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (mat[r][c] == 0) {
                    dist[r][c] = 0;
                    queue.offer(new int[]{r, c});
                }
            }
        }

        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[cur[0]][cur[1]] + 1;
                    queue.offer(new int[]{nr, nc});
                }
            }
        }

        return dist;
    }
}
