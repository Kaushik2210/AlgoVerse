import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;

class Solution {
    public int numDistinctIslands(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        boolean[][] visited = new boolean[rows][cols];
        Set<String> shapes = new HashSet<>();
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        for (int sr = 0; sr < rows; sr++) {
            for (int sc = 0; sc < cols; sc++) {
                if (grid[sr][sc] == 1 && !visited[sr][sc]) {
                    List<int[]> offsets = new ArrayList<>();
                    Deque<int[]> stack = new ArrayDeque<>();
                    stack.push(new int[]{sr, sc});
                    visited[sr][sc] = true;

                    while (!stack.isEmpty()) {
                        int[] cell = stack.pop();
                        offsets.add(new int[]{cell[0] - sr, cell[1] - sc});
                        for (int[] d : dirs) {
                            int nr = cell[0] + d[0], nc = cell[1] + d[1];
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                                    && grid[nr][nc] == 1 && !visited[nr][nc]) {
                                visited[nr][nc] = true;
                                stack.push(new int[]{nr, nc});
                            }
                        }
                    }

                    offsets.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
                    StringBuilder sb = new StringBuilder();
                    for (int[] off : offsets) {
                        sb.append(off[0]).append(',').append(off[1]).append(';');
                    }
                    shapes.add(sb.toString());
                }
            }
        }

        return shapes.size();
    }
}
