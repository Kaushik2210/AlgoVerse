import java.util.*;

class Solution {
    private List<List<Integer>> graph;

    public int[] countSubgraphsForEachDiameter(int n, int[][] edges) {
        graph = new ArrayList<>();
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        for (int[] e : edges) {
            graph.get(e[0] - 1).add(e[1] - 1);
            graph.get(e[1] - 1).add(e[0] - 1);
        }

        int[] answer = new int[n - 1];

        for (int mask = 1; mask < (1 << n); mask++) {
            int count = Integer.bitCount(mask);
            if (count < 2) continue;

            int start = Integer.numberOfTrailingZeros(mask);
            int[] dist = bfs(start, mask, n);
            int reached = 0;
            int farthestNode = start, farthestDist = 0;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0 && dist[i] != -1) {
                    reached++;
                    if (dist[i] > farthestDist) {
                        farthestDist = dist[i];
                        farthestNode = i;
                    }
                }
            }
            if (reached != count) continue;

            int[] dist2 = bfs(farthestNode, mask, n);
            int diameter = 0;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    diameter = Math.max(diameter, dist2[i]);
                }
            }

            answer[diameter - 1]++;
        }

        return answer;
    }

    private int[] bfs(int start, int mask, int n) {
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        dist[start] = 0;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(start);
        while (!queue.isEmpty()) {
            int u = queue.poll();
            for (int v : graph.get(u)) {
                if (((mask >> v) & 1) == 1 && dist[v] == -1) {
                    dist[v] = dist[u] + 1;
                    queue.add(v);
                }
            }
        }
        return dist;
    }
}
