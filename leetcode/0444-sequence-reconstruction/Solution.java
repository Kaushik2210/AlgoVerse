import java.util.*;

class Solution {
    public boolean sequenceReconstruction(int[] nums, List<List<Integer>> sequences) {
        int n = nums.length;
        Map<Integer, Set<Integer>> graph = new HashMap<>();
        int[] inDegree = new int[n + 1];
        Set<Integer> seen = new HashSet<>();

        for (int v = 1; v <= n; v++) {
            graph.put(v, new HashSet<>());
        }

        for (List<Integer> seq : sequences) {
            for (int v : seq) {
                seen.add(v);
            }
            for (int i = 0; i + 1 < seq.size(); i++) {
                int a = seq.get(i), b = seq.get(i + 1);
                if (graph.get(a).add(b)) {
                    inDegree[b]++;
                }
            }
        }

        if (seen.size() != n) {
            return false;
        }
        for (int v = 1; v <= n; v++) {
            if (!seen.contains(v)) return false;
        }

        Deque<Integer> queue = new ArrayDeque<>();
        for (int v = 1; v <= n; v++) {
            if (inDegree[v] == 0) queue.add(v);
        }

        List<Integer> order = new ArrayList<>();
        while (!queue.isEmpty()) {
            if (queue.size() != 1) {
                return false;
            }
            int v = queue.poll();
            order.add(v);
            for (int nxt : graph.get(v)) {
                inDegree[nxt]--;
                if (inDegree[nxt] == 0) queue.add(nxt);
            }
        }

        if (order.size() != n) return false;
        for (int i = 0; i < n; i++) {
            if (order.get(i) != nums[i]) return false;
        }
        return true;
    }
}
