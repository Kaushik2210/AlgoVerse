import java.util.*;

class Solution {
    public long minimumFuelCost(int[][] roads, int seats) {
        int n = roads.length + 1;
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        for (int[] r : roads) {
            graph.get(r[0]).add(r[1]);
            graph.get(r[1]).add(r[0]);
        }

        int[] subtreeSize = new int[n];
        Arrays.fill(subtreeSize, 1);
        int[] parent = new int[n];
        Arrays.fill(parent, -1);
        boolean[] visited = new boolean[n];
        visited[0] = true;

        List<Integer> order = new ArrayList<>();
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order.add(u);
            for (int v : graph.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    stack.push(v);
                }
            }
        }

        long totalFuel = 0;
        for (int i = order.size() - 1; i >= 0; i--) {
            int u = order.get(i);
            if (parent[u] != -1) {
                subtreeSize[parent[u]] += subtreeSize[u];
                totalFuel += (subtreeSize[u] + seats - 1) / seats;
            }
        }

        return totalFuel;
    }
}
