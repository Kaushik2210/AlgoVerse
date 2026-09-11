import java.util.ArrayList;
import java.util.List;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] pre : prerequisites) {
            graph.get(pre[0]).add(pre[1]);
        }

        // 0 = unvisited, 1 = visiting, 2 = done
        int[] state = new int[numCourses];

        for (int course = 0; course < numCourses; course++) {
            if (state[course] == 0 && hasCycle(course, graph, state)) {
                return false;
            }
        }

        return true;
    }

    private boolean hasCycle(int node, List<List<Integer>> graph, int[] state) {
        if (state[node] == 1) {
            return true;
        }
        if (state[node] == 2) {
            return false;
        }

        state[node] = 1;
        for (int neighbor : graph.get(node)) {
            if (hasCycle(neighbor, graph, state)) {
                return true;
            }
        }
        state[node] = 2;
        return false;
    }
}
