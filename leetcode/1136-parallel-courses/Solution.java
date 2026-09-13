import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {
    public int minimumSemesters(int n, int[][] relations) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }
        int[] indegree = new int[n + 1];
        for (int[] relation : relations) {
            graph.get(relation[0]).add(relation[1]);
            indegree[relation[1]]++;
        }

        Deque<Integer> queue = new ArrayDeque<>();
        for (int c = 1; c <= n; c++) {
            if (indegree[c] == 0) {
                queue.add(c);
            }
        }

        int studied = 0;
        int semesters = 0;

        while (!queue.isEmpty()) {
            semesters++;
            int size = queue.size();
            for (int k = 0; k < size; k++) {
                int course = queue.poll();
                studied++;
                for (int nxt : graph.get(course)) {
                    indegree[nxt]--;
                    if (indegree[nxt] == 0) {
                        queue.add(nxt);
                    }
                }
            }
        }

        return studied == n ? semesters : -1;
    }
}
