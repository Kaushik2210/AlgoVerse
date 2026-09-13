import java.util.*;

class Solution {
    public int longestPath(int[] parent, String s) {
        int n = parent.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int v = 1; v < n; v++) {
            children.get(parent[v]).add(v);
        }

        int[] longestDown = new int[n];
        Arrays.fill(longestDown, 1);
        int[] answer = {1};

        List<Integer> order = new ArrayList<>();
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order.add(u);
            for (int c : children.get(u)) {
                stack.push(c);
            }
        }

        for (int i = order.size() - 1; i >= 0; i--) {
            int u = order.get(i);
            int best1 = 0, best2 = 0;
            for (int c : children.get(u)) {
                if (s.charAt(c) != s.charAt(u)) {
                    int chain = longestDown[c];
                    if (chain > best1) {
                        best2 = best1;
                        best1 = chain;
                    } else if (chain > best2) {
                        best2 = chain;
                    }
                }
            }
            longestDown[u] = 1 + best1;
            answer[0] = Math.max(answer[0], 1 + best1 + best2);
        }

        return answer[0];
    }
}
