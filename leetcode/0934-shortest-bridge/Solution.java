import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int shortestBridge(int[][] grid) {
        int n = grid.length;
        boolean[][] visited = new boolean[n][n];
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        int sr = -1, sc = -1;
        outer:
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    sr = r;
                    sc = c;
                    break outer;
                }
            }
        }

        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[]{sr, sc});
        visited[sr][sc] = true;
        Deque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[]{sr, sc, 0});

        while (!stack.isEmpty()) {
            int[] cell = stack.pop();
            for (int[] d : dirs) {
                int nr = cell[0] + d[0], nc = cell[1] + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc] && grid[nr][nc] == 1) {
                    visited[nr][nc] = true;
                    stack.push(new int[]{nr, nc});
                    queue.add(new int[]{nr, nc, 0});
                }
            }
        }

        while (!queue.isEmpty()) {
            int[] cell = queue.poll();
            int r = cell[0], c = cell[1], dist = cell[2];
            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                    if (grid[nr][nc] == 1) {
                        return dist;
                    }
                    visited[nr][nc] = true;
                    queue.add(new int[]{nr, nc, dist + 1});
                }
            }
        }

        return -1;
    }
}
