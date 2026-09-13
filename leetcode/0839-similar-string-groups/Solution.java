class Solution {
    private int[] parent;

    public int numSimilarGroups(String[] strs) {
        int n = strs.length;
        parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (find(i) != find(j) && isSimilar(strs[i], strs[j])) {
                    union(i, j);
                }
            }
        }

        int groups = 0;
        for (int i = 0; i < n; i++) {
            if (find(i) == i) {
                groups++;
            }
        }
        return groups;
    }

    private boolean isSimilar(String a, String b) {
        int diff = 0;
        for (int i = 0; i < a.length(); i++) {
            if (a.charAt(i) != b.charAt(i)) {
                diff++;
                if (diff > 2) {
                    return false;
                }
            }
        }
        return true;
    }

    private int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int a, int b) {
        int ra = find(a);
        int rb = find(b);
        if (ra != rb) {
            parent[ra] = rb;
        }
    }
}
