import java.util.ArrayList;
import java.util.List;

class Solution {
    private List<List<Integer>> graph;
    private int[] quiet;
    private int[] memo;

    public int[] loudAndRich(int[][] richer, int[] quiet) {
        int n = quiet.length;
        this.quiet = quiet;
        graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] r : richer) {
            graph.get(r[1]).add(r[0]); // r[1] is poorer than r[0], explore from poorer towards richer
        }

        memo = new int[n];
        java.util.Arrays.fill(memo, -1);

        int[] answer = new int[n];
        for (int x = 0; x < n; x++) {
            answer[x] = quietest(x);
        }
        return answer;
    }

    private int quietest(int x) {
        if (memo[x] != -1) {
            return memo[x];
        }

        int best = x;
        for (int y : graph.get(x)) {
            int candidate = quietest(y);
            if (quiet[candidate] < quiet[best]) {
                best = candidate;
            }
        }

        memo[x] = best;
        return best;
    }
}
