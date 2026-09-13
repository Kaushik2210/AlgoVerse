import java.util.ArrayList;
import java.util.List;

class Solution {
    private String num;
    private int target;
    private List<String> results;

    public List<String> addOperators(String num, int target) {
        this.num = num;
        this.target = target;
        this.results = new ArrayList<>();
        backtrack(0, "", 0L, 0L);
        return results;
    }

    private void backtrack(int index, String expr, long value, long lastOperand) {
        int n = num.length();
        if (index == n) {
            if (value == target) {
                results.add(expr);
            }
            return;
        }

        for (int end = index + 1; end <= n; end++) {
            String piece = num.substring(index, end);
            if (piece.length() > 1 && piece.charAt(0) == '0') {
                break; // no leading zeros in a multi-digit operand
            }
            long operand = Long.parseLong(piece);

            if (index == 0) {
                backtrack(end, piece, operand, operand);
            } else {
                backtrack(end, expr + "+" + piece, value + operand, operand);
                backtrack(end, expr + "-" + piece, value - operand, -operand);
                backtrack(end, expr + "*" + piece, value - lastOperand + lastOperand * operand,
                        lastOperand * operand);
            }
        }
    }
}
