import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        backtrack(n, 0, 0, new StringBuilder(), result);
        return result;
    }

    private void backtrack(int n, int openCount, int closeCount, StringBuilder path, List<String> result) {
        if (openCount == n && closeCount == n) {
            result.add(path.toString());
            return;
        }

        if (openCount < n) {
            path.append('(');
            backtrack(n, openCount + 1, closeCount, path, result);
            path.deleteCharAt(path.length() - 1);
        }

        if (closeCount < openCount) {
            path.append(')');
            backtrack(n, openCount, closeCount + 1, path, result);
            path.deleteCharAt(path.length() - 1);
        }
    }
}
