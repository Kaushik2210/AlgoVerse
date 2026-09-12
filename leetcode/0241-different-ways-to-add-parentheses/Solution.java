import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    private final Map<String, List<Integer>> memo = new HashMap<>();

    public List<Integer> diffWaysToCompute(String expression) {
        if (memo.containsKey(expression)) {
            return memo.get(expression);
        }

        if (isNumber(expression)) {
            List<Integer> single = new ArrayList<>();
            single.add(Integer.parseInt(expression));
            memo.put(expression, single);
            return single;
        }

        List<Integer> results = new ArrayList<>();
        for (int i = 0; i < expression.length(); i++) {
            char ch = expression.charAt(i);
            if (ch == '+' || ch == '-' || ch == '*') {
                List<Integer> left = diffWaysToCompute(expression.substring(0, i));
                List<Integer> right = diffWaysToCompute(expression.substring(i + 1));
                for (int l : left) {
                    for (int r : right) {
                        switch (ch) {
                            case '+': results.add(l + r); break;
                            case '-': results.add(l - r); break;
                            case '*': results.add(l * r); break;
                        }
                    }
                }
            }
        }

        memo.put(expression, results);
        return results;
    }

    private boolean isNumber(String s) {
        for (char c : s.toCharArray()) {
            if (!Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }
}
