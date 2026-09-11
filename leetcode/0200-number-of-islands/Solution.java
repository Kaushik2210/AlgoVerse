import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0 || grid[0].length == 0) {
            return 0;
        }

        int rows = grid.length, cols = grid[0].length;
        int islands = 0;
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    grid[r][c] = '0';

                    Deque<int[]> stack = new ArrayDeque<>();
                    stack.push(new int[]{r, c});
                    while (!stack.isEmpty()) {
                        int[] cell = stack.pop();
                        for (int[] d : directions) {
                            int nr = cell[0] + d[0];
                            int nc = cell[1] + d[1];
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == '1') {
                                grid[nr][nc] = '0';
                                stack.push(new int[]{nr, nc});
                            }
                        }
                    }
                }
            }
        }

        return islands;
    }
}
