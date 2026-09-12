import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> result = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(String s, int start, List<String> segments, List<String> result) {
        int n = s.length();

        if (segments.size() == 4) {
            if (start == n) {
                result.add(String.join(".", segments));
            }
            return;
        }

        if (n - start > (4 - segments.size()) * 3) {
            return;
        }

        for (int length = 1; length <= 3 && start + length <= n; length++) {
            String segment = s.substring(start, start + length);
            if (isValid(segment)) {
                segments.add(segment);
                backtrack(s, start + length, segments, result);
                segments.remove(segments.size() - 1);
            }
        }
    }

    private boolean isValid(String segment) {
        if (segment.length() > 1 && segment.charAt(0) == '0') {
            return false;
        }
        int value = Integer.parseInt(segment);
        return value >= 0 && value <= 255;
    }
}
