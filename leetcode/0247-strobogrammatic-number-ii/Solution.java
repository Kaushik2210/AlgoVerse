import java.util.ArrayList;
import java.util.List;

class Solution {
    private static final char[][] PAIRS = {
            {'0', '0'}, {'1', '1'}, {'6', '9'}, {'8', '8'}, {'9', '6'}
    };

    public List<String> findStrobogrammatic(int n) {
        return build(n, n);
    }

    private List<String> build(int length, int total) {
        List<String> results = new ArrayList<>();

        if (length == 0) {
            results.add("");
            return results;
        }
        if (length == 1) {
            results.add("0");
            results.add("1");
            results.add("8");
            return results;
        }

        List<String> inner = build(length - 2, total);
        for (char[] pair : PAIRS) {
            if (pair[0] == '0' && length == total) {
                continue; // no leading zero on the full-length number
            }
            for (String mid : inner) {
                results.add(pair[0] + mid + pair[1]);
            }
        }

        return results;
    }
}
