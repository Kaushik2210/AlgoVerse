import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        List<List<int[]>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] time : times) {
            graph.get(time[0]).add(new int[]{time[1], time[2]});
        }

        int[] dist = new int[n + 1];
        java.util.Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;

        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        heap.add(new int[]{0, k});

        while (!heap.isEmpty()) {
            int[] current = heap.poll();
            int d = current[0];
            int node = current[1];
            if (d > dist[node]) {
                continue;
            }
            for (int[] edge : graph.get(node)) {
                int neighbor = edge[0];
                int weight = edge[1];
                int newDist = d + weight;
                if (newDist < dist[neighbor]) {
                    dist[neighbor] = newDist;
                    heap.add(new int[]{newDist, neighbor});
                }
            }
        }

        int farthest = 0;
        for (int i = 1; i <= n; i++) {
            farthest = Math.max(farthest, dist[i]);
        }
        return farthest == Integer.MAX_VALUE ? -1 : farthest;
    }
}
