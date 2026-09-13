class Solution {
    public char[][] rotateTheBox(char[][] box) {
        int m = box.length, n = box[0].length;
        char[][] grid = new char[m][];
        for (int i = 0; i < m; i++) {
            grid[i] = box[i].clone();
        }

        for (char[] row : grid) {
            int write = n - 1;
            for (int col = n - 1; col >= 0; col--) {
                if (row[col] == '*') {
                    write = col - 1;
                } else if (row[col] == '#') {
                    row[col] = '.';
                    row[write] = '#';
                    write--;
                }
            }
        }

        char[][] rotated = new char[n][m];
        for (char[] row : rotated) {
            java.util.Arrays.fill(row, '.');
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                rotated[j][m - 1 - i] = grid[i][j];
            }
        }
        return rotated;
    }
}
