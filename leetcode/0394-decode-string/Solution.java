import java.util.Deque;
import java.util.ArrayDeque;

class Solution {
    public String decodeString(String s) {
        Deque<String> stringStack = new ArrayDeque<>();
        Deque<Integer> numStack = new ArrayDeque<>();
        StringBuilder current = new StringBuilder();
        int currentNum = 0;

        for (char ch : s.toCharArray()) {
            if (Character.isDigit(ch)) {
                currentNum = currentNum * 10 + (ch - '0');
            } else if (ch == '[') {
                stringStack.push(current.toString());
                numStack.push(currentNum);
                current = new StringBuilder();
                currentNum = 0;
            } else if (ch == ']') {
                int num = numStack.pop();
                String prev = stringStack.pop();
                StringBuilder repeated = new StringBuilder(prev);
                for (int i = 0; i < num; i++) {
                    repeated.append(current);
                }
                current = repeated;
            } else {
                current.append(ch);
            }
        }

        return current.toString();
    }
}
