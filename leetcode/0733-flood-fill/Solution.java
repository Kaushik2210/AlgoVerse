import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int original = image[sr][sc];
        if (original == color) {
            return image;
        }

        int rows = image.length, cols = image[0].length;
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[]{sr, sc});
        image[sr][sc] = color;

        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!stack.isEmpty()) {
            int[] cell = stack.pop();
            for (int[] d : dirs) {
                int nr = cell[0] + d[0], nc = cell[1] + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && image[nr][nc] == original) {
                    image[nr][nc] = color;
                    stack.push(new int[]{nr, nc});
                }
            }
        }

        return image;
    }
}
