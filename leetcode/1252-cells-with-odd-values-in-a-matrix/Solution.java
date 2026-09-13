class Solution {
    public int oddCells(int m, int n, int[][] indices) {
        int[] rowCount = new int[m];
        int[] colCount = new int[n];
        for (int[] idx : indices) {
            rowCount[idx[0]]++;
            colCount[idx[1]]++;
        }

        int oddRows = 0, oddCols = 0;
        for (int x : rowCount) if (x % 2 == 1) oddRows++;
        for (int x : colCount) if (x % 2 == 1) oddCols++;
        int evenRows = m - oddRows;
        int evenCols = n - oddCols;

        return oddRows * evenCols + evenRows * oddCols;
    }
}
