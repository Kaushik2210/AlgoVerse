import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public String parseTernary(String expression) {
        Deque<Character> stack = new ArrayDeque<>();

        for (int i = expression.length() - 1; i >= 0; i--) {
            char ch = expression.charAt(i);
            if (!stack.isEmpty() && stack.peek() == '?') {
                stack.pop();                     // discard '?'
                char trueBranch = stack.pop();
                stack.pop();                     // discard ':'
                char falseBranch = stack.pop();
                stack.push(ch == 'T' ? trueBranch : falseBranch);
            } else {
                stack.push(ch);
            }
        }

        return String.valueOf(stack.peek());
    }
}
