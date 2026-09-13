class Solution {
    public int[] findRedundantDirectedConnection(int[][] edges) {
        int n = edges.length;
        int[] nodeParent = new int[n + 1];
        int[] candidate1 = null;
        int[] candidate2 = null;
        int skipIndex = -1;

        for (int i = 0; i < n; i++) {
            int u = edges[i][0];
            int v = edges[i][1];
            if (nodeParent[v] != 0) {
                candidate1 = new int[]{nodeParent[v], v};
                candidate2 = new int[]{u, v};
                skipIndex = i;
            } else {
                nodeParent[v] = u;
            }
        }

        int[] ufParent = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            ufParent[i] = i;
        }

        for (int i = 0; i < n; i++) {
            if (i == skipIndex) {
                continue;
            }
            int u = edges[i][0];
            int v = edges[i][1];
            int ru = find(ufParent, u);
            int rv = find(ufParent, v);
            if (ru == rv) {
                return candidate1 != null ? candidate1 : new int[]{u, v};
            }
            ufParent[ru] = rv;
        }

        return candidate2;
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
