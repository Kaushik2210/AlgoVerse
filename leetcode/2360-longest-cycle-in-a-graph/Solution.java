class Solution {
    public int longestCycle(int[] edges) {
        int n = edges.length;
        int[] visitTime = new int[n];
        java.util.Arrays.fill(visitTime, -1);
        int answer = -1;
        int timer = 0;

        for (int start = 0; start < n; start++) {
            if (visitTime[start] != -1) continue;

            int walkStartTime = timer;
            int u = start;
            while (u != -1 && visitTime[u] == -1) {
                visitTime[u] = timer++;
                u = edges[u];
            }

            if (u != -1 && visitTime[u] >= walkStartTime) {
                answer = Math.max(answer, timer - visitTime[u]);
            }
        }

        return answer;
    }
}
