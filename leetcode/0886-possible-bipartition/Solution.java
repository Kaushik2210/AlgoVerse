import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

class Solution {
    public boolean possibleBipartition(int n, int[][] dislikes) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] dislike : dislikes) {
            graph.get(dislike[0]).add(dislike[1]);
            graph.get(dislike[1]).add(dislike[0]);
        }

        int[] group = new int[n + 1];

        for (int start = 1; start <= n; start++) {
            if (group[start] != 0) {
                continue;
            }
            group[start] = 1;
            Queue<Integer> queue = new ArrayDeque<>();
            queue.add(start);
            while (!queue.isEmpty()) {
                int person = queue.poll();
                for (int neighbor : graph.get(person)) {
                    if (group[neighbor] == 0) {
                        group[neighbor] = -group[person];
                        queue.add(neighbor);
                    } else if (group[neighbor] == group[person]) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}
