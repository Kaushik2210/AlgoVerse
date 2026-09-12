import java.util.Deque;
import java.util.ArrayDeque;
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Deque<Integer> stack = new ArrayDeque<>();

        for (int a : asteroids) {
            boolean alive = true;

            while (alive && a < 0 && !stack.isEmpty() && stack.peek() > 0) {
                if (stack.peek() < -a) {
                    stack.pop();
                } else if (stack.peek() == -a) {
                    stack.pop();
                    alive = false;
                } else {
                    alive = false;
                }
            }

            if (alive) {
                stack.push(a);
            }
        }

        List<Integer> reversed = new ArrayList<>(stack);
        Collections.reverse(reversed);

        int[] result = new int[reversed.size()];
        for (int i = 0; i < result.length; i++) {
            result[i] = reversed.get(i);
        }
        return result;
    }
}
