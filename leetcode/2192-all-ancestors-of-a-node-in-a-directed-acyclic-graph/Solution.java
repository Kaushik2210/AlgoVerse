import java.util.*;

class Solution {
    public List<List<Integer>> getAncestors(int n, int[][] edges) {
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        int[] inDegree = new int[n];

        for (int[] e : edges) {
            children.get(e[0]).add(e[1]);
            inDegree[e[1]]++;
        }

        List<TreeSet<Integer>> ancestors = new ArrayList<>();
        for (int i = 0; i < n; i++) ancestors.add(new TreeSet<>());

        Deque<Integer> queue = new ArrayDeque<>();
        for (int v = 0; v < n; v++) {
            if (inDegree[v] == 0) queue.add(v);
        }

        while (!queue.isEmpty()) {
            int u = queue.poll();
            for (int v : children.get(u)) {
                ancestors.get(v).add(u);
                ancestors.get(v).addAll(ancestors.get(u));
                if (--inDegree[v] == 0) queue.add(v);
            }
        }

        List<List<Integer>> result = new ArrayList<>();
        for (TreeSet<Integer> s : ancestors) {
            result.add(new ArrayList<>(s));
        }
        return result;
    }
}
