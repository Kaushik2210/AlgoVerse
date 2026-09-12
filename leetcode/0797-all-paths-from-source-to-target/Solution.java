import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

class Solution {
    private int target;
    private List<List<Integer>> results;
    private LinkedList<Integer> path;

    public List<List<Integer>> allPathsSourceTarget(int[][] graph) {
        target = graph.length - 1;
        results = new ArrayList<>();
        path = new LinkedList<>();
        path.add(0);
        dfs(graph, 0);
        return results;
    }

    private void dfs(int[][] graph, int node) {
        if (node == target) {
            results.add(new ArrayList<>(path));
            return;
        }
        for (int neighbor : graph[node]) {
            path.add(neighbor);
            dfs(graph, neighbor);
            path.removeLast();
        }
    }
}
