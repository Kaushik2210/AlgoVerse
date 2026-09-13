import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int maxDistance(int[][] grid) {
        int n = grid.length;
        Deque<int[]> queue = new ArrayDeque<>();
        boolean[][] visited = new boolean[n][n];
        int landCount = 0;

        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    queue.add(new int[]{r, c, 0});
                    visited[r][c] = true;
                    landCount++;
                }
            }
        }

        if (landCount == 0 || landCount == n * n) {
            return -1;
        }

        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        int maxDist = 0;

        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int r = cell[0], c = cell[1], dist = cell[2];
            maxDist = Math.max(maxDist, dist);
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    queue.add(new int[]{nr, nc, dist + 1});
                }
            }
        }

        return maxDist;
    }
}
