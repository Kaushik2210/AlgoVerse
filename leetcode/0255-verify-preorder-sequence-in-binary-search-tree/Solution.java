import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public boolean verifyPreorder(int[] preorder) {
        Deque<Integer> stack = new ArrayDeque<>();
        long lowerBound = Long.MIN_VALUE;

        for (int num : preorder) {
            if (num < lowerBound) {
                return false;
            }
            while (!stack.isEmpty() && stack.peek() < num) {
                lowerBound = stack.pop();
            }
            stack.push(num);
        }

        return true;
    }
}
