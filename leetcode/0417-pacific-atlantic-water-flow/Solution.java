import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> result = new ArrayList<>();
        if (heights.length == 0 || heights[0].length == 0) {
            return result;
        }

        int rows = heights.length, cols = heights[0].length;
        boolean[][] pacific = new boolean[rows][cols];
        boolean[][] atlantic = new boolean[rows][cols];

        Deque<int[]> pacificStack = new ArrayDeque<>();
        Deque<int[]> atlanticStack = new ArrayDeque<>();

        for (int c = 0; c < cols; c++) {
            pacific[0][c] = true;
            pacificStack.push(new int[]{0, c});
            atlantic[rows - 1][c] = true;
            atlanticStack.push(new int[]{rows - 1, c});
        }
        for (int r = 0; r < rows; r++) {
            pacific[r][0] = true;
            pacificStack.push(new int[]{r, 0});
            atlantic[r][cols - 1] = true;
            atlanticStack.push(new int[]{r, cols - 1});
        }

        flood(heights, pacific, pacificStack, rows, cols);
        flood(heights, atlantic, atlanticStack, rows, cols);

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (pacific[r][c] && atlantic[r][c]) {
                    result.add(List.of(r, c));
                }
            }
        }

        return result;
    }

    private void flood(int[][] heights, boolean[][] reachable, Deque<int[]> stack, int rows, int cols) {
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!stack.isEmpty()) {
            int[] cur = stack.pop();
            for (int[] d : dirs) {
                int nr = cur[0] + d[0], nc = cur[1] + d[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !reachable[nr][nc]
                        && heights[nr][nc] >= heights[cur[0]][cur[1]]) {
                    reachable[nr][nc] = true;
                    stack.push(new int[]{nr, nc});
                }
            }
        }
    }
}
