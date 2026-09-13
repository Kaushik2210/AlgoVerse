import java.util.*;

class Solution {
    public List<List<Integer>> criticalConnections(int n, List<List<Integer>> connections) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        for (List<Integer> c : connections) {
            graph.get(c.get(0)).add(c.get(1));
            graph.get(c.get(1)).add(c.get(0));
        }

        int[] disc = new int[n];
        int[] low = new int[n];
        Arrays.fill(disc, -1);
        Arrays.fill(low, -1);
        List<List<Integer>> bridges = new ArrayList<>();
        int[] timer = {0};

        for (int start = 0; start < n; start++) {
            if (disc[start] != -1) continue;
            dfs(start, -1, graph, disc, low, timer, bridges);
        }

        return bridges;
    }

    // Iterative Tarjan bridge-finding to stay safe with graphs up to 10^5
    // nodes, where a recursive DFS could blow the call stack.
    private void dfs(int start, int parent, List<List<Integer>> graph, int[] disc, int[] low,
                      int[] timer, List<List<Integer>> bridges) {
        Deque<int[]> stack = new ArrayDeque<>(); // {node, parentEdgeIndex, nextChildIdx}
        disc[start] = low[start] = timer[0]++;
        stack.push(new int[]{start, -1, 0});

        while (!stack.isEmpty()) {
            int[] frame = stack.peek();
            int u = frame[0], parentEdge = frame[1], idx = frame[2];

            if (idx < graph.get(u).size()) {
                frame[2]++;
                int v = graph.get(u).get(idx);

                if (idx == parentEdge) continue;

                if (disc[v] == -1) {
                    disc[v] = low[v] = timer[0]++;
                    int backIdx = graph.get(v).indexOf(u);
                    stack.push(new int[]{v, backIdx, 0});
                } else {
                    low[u] = Math.min(low[u], disc[v]);
                }
            } else {
                stack.pop();
                if (!stack.isEmpty()) {
                    int parentU = stack.peek()[0];
                    low[parentU] = Math.min(low[parentU], low[u]);
                    if (low[u] > disc[parentU]) {
                        bridges.add(Arrays.asList(parentU, u));
                    }
                }
            }
        }
    }
}
