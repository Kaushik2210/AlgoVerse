import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public String simplifyPath(String path) {
        Deque<String> stack = new ArrayDeque<>();
        for (String part : path.split("/")) {
            if (part.isEmpty() || part.equals(".")) {
                continue;
            }
            if (part.equals("..")) {
                if (!stack.isEmpty()) {
                    stack.pollLast();
                }
            } else {
                stack.addLast(part);
            }
        }

        StringBuilder sb = new StringBuilder();
        for (String dir : stack) {
            sb.append('/').append(dir);
        }

        return sb.length() == 0 ? "/" : sb.toString();
    }
}
