import java.util.Deque;
import java.util.ArrayDeque;
import java.util.List;

class Solution {
    public int[] exclusiveTime(int n, List<String> logs) {
        int[] result = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        int prevTime = 0;

        for (String log : logs) {
            String[] parts = log.split(":");
            int fnId = Integer.parseInt(parts[0]);
            String action = parts[1];
            int time = Integer.parseInt(parts[2]);

            if (action.equals("start")) {
                if (!stack.isEmpty()) {
                    result[stack.peek()] += time - prevTime;
                }
                stack.push(fnId);
                prevTime = time;
            } else {
                result[stack.pop()] += time - prevTime + 1;
                prevTime = time + 1;
            }
        }

        return result;
    }
}
