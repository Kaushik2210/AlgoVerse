import java.util.Deque;
import java.util.ArrayDeque;

class Solution {
    public int calculate(String s) {
        Deque<Integer> stack = new ArrayDeque<>();
        int num = 0;
        char op = '+';
        int n = s.length();

        for (int i = 0; i < n; i++) {
            char ch = s.charAt(i);
            if (Character.isDigit(ch)) {
                num = num * 10 + (ch - '0');
            }

            if ((!Character.isDigit(ch) && ch != ' ') || i == n - 1) {
                switch (op) {
                    case '+':
                        stack.push(num);
                        break;
                    case '-':
                        stack.push(-num);
                        break;
                    case '*':
                        stack.push(stack.pop() * num);
                        break;
                    case '/':
                        stack.push(stack.pop() / num); // Java truncates toward zero
                        break;
                }
                op = ch;
                num = 0;
            }
        }

        int result = 0;
        for (int val : stack) {
            result += val;
        }
        return result;
    }
}
