import java.util.ArrayDeque;
import java.util.Deque;
import java.util.List;

class Solution {
    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        boolean[] visited = new boolean[n];
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        visited[0] = true;
        int count = 1;

        while (!stack.isEmpty()) {
            int room = stack.pop();
            for (int key : rooms.get(room)) {
                if (!visited[key]) {
                    visited[key] = true;
                    count++;
                    stack.push(key);
                }
            }
        }

        return count == n;
    }
}
