import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    public int minJumps(int[] arr) {
        int n = arr.length;
        if (n == 1) {
            return 0;
        }

        Map<Integer, List<Integer>> valueToIndices = new HashMap<>();
        for (int i = 0; i < n; i++) {
            valueToIndices.computeIfAbsent(arr[i], k -> new ArrayList<>()).add(i);
        }

        boolean[] visited = new boolean[n];
        visited[0] = true;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(0);
        int steps = 0;

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int k = 0; k < size; k++) {
                int i = queue.poll();
                if (i == n - 1) {
                    return steps;
                }

                List<Integer> group = valueToIndices.getOrDefault(arr[i], new ArrayList<>());
                group.add(i - 1);
                group.add(i + 1);
                valueToIndices.put(arr[i], new ArrayList<>());

                for (int j : group) {
                    if (j >= 0 && j < n && !visited[j]) {
                        visited[j] = true;
                        queue.add(j);
                    }
                }
            }
            steps++;
        }

        return -1;
    }
}
