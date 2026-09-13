import java.util.ArrayList;
import java.util.List;

class Solution {
    public int[][] spiralMatrixIII(int rows, int cols, int rStart, int cStart) {
        List<int[]> result = new ArrayList<>();
        result.add(new int[]{rStart, cStart});
        int r = rStart, c = cStart;
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int step = 1, d = 0;
        int total = rows * cols;

        while (result.size() < total) {
            for (int turn = 0; turn < 2; turn++) {
                int dr = directions[d][0], dc = directions[d][1];
                for (int k = 0; k < step; k++) {
                    r += dr;
                    c += dc;
                    if (r >= 0 && r < rows && c >= 0 && c < cols) {
                        result.add(new int[]{r, c});
                        if (result.size() == total) {
                            return result.toArray(new int[0][]);
                        }
                    }
                }
                d = (d + 1) % 4;
            }
            step++;
        }
        return result.toArray(new int[0][]);
    }
}
