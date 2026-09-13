import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> findSmallestSetOfVertices(int n, List<List<Integer>> edges) {
        int[] indegree = new int[n];
        for (List<Integer> edge : edges) {
            indegree[edge.get(1)]++;
        }

        List<Integer> result = new ArrayList<>();
        for (int node = 0; node < n; node++) {
            if (indegree[node] == 0) {
                result.add(node);
            }
        }
        return result;
    }
}
