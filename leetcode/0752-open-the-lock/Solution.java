import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int openLock(String[] deadends, String target) {
        Set<String> dead = new HashSet<>();
        for (String d : deadends) dead.add(d);

        if (dead.contains("0000")) return -1;
        if (target.equals("0000")) return 0;

        Set<String> visited = new HashSet<>();
        visited.add("0000");
        Deque<String> queue = new ArrayDeque<>();
        queue.add("0000");
        int steps = 0;

        while (!queue.isEmpty()) {
            int size = queue.size();
            steps++;
            for (int s = 0; s < size; s++) {
                String state = queue.poll();
                char[] chars = state.toCharArray();
                for (int i = 0; i < 4; i++) {
                    char original = chars[i];
                    int digit = original - '0';
                    for (int delta : new int[]{-1, 1}) {
                        int nextDigit = (digit + delta + 10) % 10;
                        chars[i] = (char) ('0' + nextDigit);
                        String nextState = new String(chars);
                        if (!dead.contains(nextState) && !visited.contains(nextState)) {
                            if (nextState.equals(target)) return steps;
                            visited.add(nextState);
                            queue.add(nextState);
                        }
                    }
                    chars[i] = original;
                }
            }
        }

        return -1;
    }
}
