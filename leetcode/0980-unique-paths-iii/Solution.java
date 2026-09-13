class Solution {
    private int rows, cols;
    private int paths = 0;

    public int uniquePathsIII(int[][] grid) {
        rows = grid.length;
        cols = grid[0].length;
        int startR = -1, startC = -1, emptyCount = 0;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    startR = r;
                    startC = c;
                } else if (grid[r][c] == 0) {
                    emptyCount++;
                }
            }
        }

        dfs(grid, startR, startC, emptyCount + 1);
        return paths;
    }

    private void dfs(int[][] grid, int r, int c, int remaining) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == -1) {
            return;
        }
        if (grid[r][c] == 2) {
            if (remaining == 0) {
                paths++;
            }
            return;
        }

        int original = grid[r][c];
        grid[r][c] = -1; // mark visited
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int[] d : dirs) {
            dfs(grid, r + d[0], c + d[1], remaining - 1);
        }
        grid[r][c] = original; // backtrack
    }
}
