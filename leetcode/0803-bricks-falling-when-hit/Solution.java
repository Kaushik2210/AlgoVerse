class Solution {
    private int[] parent, size;

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return;
        if (size[ra] < size[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra;
        size[ra] += size[rb];
    }

    public int[] hitBricks(int[][] grid, int[][] hits) {
        int rows = grid.length, cols = grid[0].length;
        int roof = rows * cols;
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        int[][] finalGrid = new int[rows][cols];
        for (int r = 0; r < rows; r++) finalGrid[r] = grid[r].clone();
        for (int[] hit : hits) finalGrid[hit[0]][hit[1]] = 0;

        parent = new int[rows * cols + 1];
        size = new int[rows * cols + 1];
        for (int i = 0; i < parent.length; i++) { parent[i] = i; size[i] = 1; }

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (finalGrid[r][c] == 1) {
                    if (r == 0) union(idx(r, c, cols), roof);
                    for (int[] d : directions) {
                        int nr = r + d[0], nc = c + d[1];
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && finalGrid[nr][nc] == 1) {
                            union(idx(r, c, cols), idx(nr, nc, cols));
                        }
                    }
                }
            }
        }

        int[] result = new int[hits.length];
        for (int i = hits.length - 1; i >= 0; i--) {
            int r = hits[i][0], c = hits[i][1];
            if (grid[r][c] == 0) continue;

            int before = size[find(roof)];

            finalGrid[r][c] = 1;
            if (r == 0) union(idx(r, c, cols), roof);
            for (int[] d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && finalGrid[nr][nc] == 1) {
                    union(idx(r, c, cols), idx(nr, nc, cols));
                }
            }

            int after = size[find(roof)];
            result[i] = Math.max(0, after - before - 1);
        }

        return result;
    }

    private int idx(int r, int c, int cols) {
        return r * cols + c;
    }
}
