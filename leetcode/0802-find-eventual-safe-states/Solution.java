import java.util.*;

class Solution {
    public List<Integer> eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        List<List<Integer>> reverse = new ArrayList<>();
        for (int i = 0; i < n; i++) reverse.add(new ArrayList<>());
        int[] outDegree = new int[n];

        for (int u = 0; u < n; u++) {
            outDegree[u] = graph[u].length;
            for (int v : graph[u]) {
                reverse.get(v).add(u);
            }
        }

        Deque<Integer> queue = new ArrayDeque<>();
        for (int u = 0; u < n; u++) {
            if (outDegree[u] == 0) queue.add(u);
        }

        boolean[] safe = new boolean[n];
        while (!queue.isEmpty()) {
            int u = queue.poll();
            safe[u] = true;
            for (int p : reverse.get(u)) {
                if (--outDegree[p] == 0) queue.add(p);
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int u = 0; u < n; u++) {
            if (safe[u]) result.add(u);
        }
        return result;
    }
}
