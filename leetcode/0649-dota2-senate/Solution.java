import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public String predictPartyVictory(String senate) {
        int n = senate.length();
        Deque<Integer> radiant = new ArrayDeque<>();
        Deque<Integer> dire = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            if (senate.charAt(i) == 'R') {
                radiant.addLast(i);
            } else {
                dire.addLast(i);
            }
        }

        while (!radiant.isEmpty() && !dire.isEmpty()) {
            int r = radiant.pollFirst();
            int d = dire.pollFirst();
            if (r < d) {
                radiant.addLast(r + n);
            } else {
                dire.addLast(d + n);
            }
        }

        return radiant.isEmpty() ? "Dire" : "Radiant";
    }
}
