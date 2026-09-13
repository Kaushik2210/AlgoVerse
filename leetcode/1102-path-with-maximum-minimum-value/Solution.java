import java.util.PriorityQueue;

class Solution {
    public int maximumMinimumPath(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> b[0] - a[0]); // max-heap on score
        boolean[][] visited = new boolean[rows][cols];

        heap.offer(new int[]{grid[0][0], 0, 0});
        visited[0][0] = true;

        while (!heap.isEmpty()) {
            int[] top = heap.poll();
            int score = top[0], r = top[1], c = top[2];
            if (r == rows - 1 && c == cols - 1) return score;

            for (int[] d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    int newScore = Math.min(score, grid[nr][nc]);
                    heap.offer(new int[]{newScore, nr, nc});
                }
            }
        }

        return -1;
    }
}
