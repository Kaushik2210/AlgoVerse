class Solution {
    private int[] parent;

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        parent = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }

        for (int[] edge : edges) {
            int u = edge[0], v = edge[1];
            int ru = find(u), rv = find(v);
            if (ru == rv) {
                return edge;
            }
            parent[ru] = rv;
        }

        return new int[]{};
    }
}
