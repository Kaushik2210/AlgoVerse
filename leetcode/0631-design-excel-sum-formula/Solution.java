import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Excel {
    private final int[][] mat;
    // formulas[row][col] = list of {row, col} cells whose values get summed together
    private final Map<Integer, List<int[]>> formulas = new HashMap<>();

    public Excel(int height, char width) {
        int w = width - 'A' + 1;
        mat = new int[height + 1][w];
    }

    private int key(int row, int col) {
        return row * 32 + col; // width is at most 26 ('A'..'Z'), so this is collision-free
    }

    public void set(int row, char column, int val) {
        int col = column - 'A';
        formulas.remove(key(row, col));
        mat[row][col] = val;
    }

    public int get(int row, char column) {
        int col = column - 'A';
        return getValue(row, col);
    }

    private int getValue(int row, int col) {
        List<int[]> cells = formulas.get(key(row, col));
        if (cells != null) {
            int total = 0;
            for (int[] cell : cells) {
                total += getValue(cell[0], cell[1]);
            }
            return total;
        }
        return mat[row][col];
    }

    public int sum(int row, char column, String[] numbers) {
        int col = column - 'A';
        List<int[]> cells = new ArrayList<>();
        for (String token : numbers) {
            if (token.contains(":")) {
                String[] parts = token.split(":");
                int[] topLeft = parseCell(parts[0]);
                int[] bottomRight = parseCell(parts[1]);
                for (int r = topLeft[0]; r <= bottomRight[0]; r++) {
                    for (int c = topLeft[1]; c <= bottomRight[1]; c++) {
                        cells.add(new int[]{r, c});
                    }
                }
            } else {
                cells.add(parseCell(token));
            }
        }
        formulas.put(key(row, col), cells);
        return getValue(row, col);
    }

    private int[] parseCell(String s) {
        int c = s.charAt(0) - 'A';
        int r = Integer.parseInt(s.substring(1));
        return new int[]{r, c};
    }
}

/**
 * Your Excel object will be instantiated and called as such:
 * Excel obj = new Excel(height, width);
 * obj.set(row,column,val);
 * int param_2 = obj.get(row,column);
 * int param_3 = obj.sum(row,column,numbers);
 */
