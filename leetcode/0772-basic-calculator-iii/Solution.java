import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    private int i = 0;
    private String s;

    public int calculate(String s) {
        this.s = s;
        this.i = 0;
        return evaluate();
    }

    private int evaluate() {
        Deque<Integer> stack = new ArrayDeque<>();
        int num = 0;
        char op = '+';

        while (i < s.length()) {
            char ch = s.charAt(i);
            if (ch == ' ') {
                i++;
                continue;
            }
            if (Character.isDigit(ch)) {
                num = num * 10 + (ch - '0');
                i++;
                continue;
            }
            if (ch == '(') {
                i++;
                num = evaluate();
                apply(stack, op, num);
                op = 0;
                num = 0;
                if (i < s.length() && s.charAt(i) == ')') {
                    i++;
                }
                if (i < s.length() && "+-*/".indexOf(s.charAt(i)) >= 0) {
                    op = s.charAt(i);
                    i++;
                }
                continue;
            }
            if (ch == ')') {
                apply(stack, op, num);
                return sumStack(stack);
            }
            if ("+-*/".indexOf(ch) >= 0) {
                apply(stack, op, num);
                op = ch;
                num = 0;
                i++;
                continue;
            }
        }

        apply(stack, op, num);
        return sumStack(stack);
    }

    private void apply(Deque<Integer> stack, char op, int num) {
        if (op == 0) return;
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
                stack.push(stack.pop() / num);
                break;
        }
    }

    private int sumStack(Deque<Integer> stack) {
        int total = 0;
        for (int v : stack) {
            total += v;
        }
        return total;
    }
}
