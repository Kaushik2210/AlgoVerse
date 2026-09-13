import java.util.ArrayList;
import java.util.List;

class Solution {
    private int[] parent, rank_;

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private boolean union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return false;
        if (rank_[ra] < rank_[rb]) { int t = ra; ra = rb; rb = t; }
        parent[rb] = ra;
        if (rank_[ra] == rank_[rb]) rank_[ra]++;
        return true;
    }

    public List<Integer> numIslands2(int m, int n, int[][] positions) {
        parent = new int[m * n];
        rank_ = new int[m * n];
        for (int i = 0; i < m * n; i++) parent[i] = i;

        boolean[][] isLand = new boolean[m][n];
        int islandCount = 0;
        List<Integer> result = new ArrayList<>();
        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        for (int[] pos : positions) {
            int r = pos[0], c = pos[1];
            if (isLand[r][c]) {
                result.add(islandCount);
                continue;
            }

            isLand[r][c] = true;
            islandCount++;

            for (int[] d : directions) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && isLand[nr][nc]) {
                    if (union(r * n + c, nr * n + nc)) {
                        islandCount--;
                    }
                }
            }

            result.add(islandCount);
        }

        return result;
    }
}
