import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        int best = 0;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    best = Math.max(best, flood(grid, r, c, rows, cols));
                }
            }
        }

        return best;
    }

    private int flood(int[][] grid, int r, int c, int rows, int cols) {
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[]{r, c});
        grid[r][c] = 0;
        int area = 0;

        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!stack.isEmpty()) {
            int[] cur = stack.pop();
            area++;
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 0;
                    stack.push(new int[]{nr, nc});
                }
            }
        }

        return area;
    }
}
