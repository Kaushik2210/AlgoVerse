import java.util.*;

class Solution {
    public int[][] diagonalSort(int[][] mat) {
        int m = mat.length, n = mat[0].length;
        Map<Integer, PriorityQueue<Integer>> diagonals = new HashMap<>();

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                diagonals.computeIfAbsent(i - j, k -> new PriorityQueue<>()).add(mat[i][j]);
            }
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                mat[i][j] = diagonals.get(i - j).poll();
            }
        }

        return mat;
    }
}
