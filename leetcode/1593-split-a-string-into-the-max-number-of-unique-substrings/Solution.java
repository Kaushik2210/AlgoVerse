import java.util.HashSet;
import java.util.Set;

class Solution {
    private final Set<String> seen = new HashSet<>();
    private int best = 0;
    private String s;

    public int maxUniqueSplit(String s) {
        this.s = s;
        backtrack(0);
        return best;
    }

    private void backtrack(int start) {
        int n = s.length();
        if (start == n) {
            best = Math.max(best, seen.size());
            return;
        }
        if (seen.size() + (n - start) <= best) {
            return;
        }
        for (int end = start + 1; end <= n; end++) {
            String piece = s.substring(start, end);
            if (!seen.contains(piece)) {
                seen.add(piece);
                backtrack(end);
                seen.remove(piece);
            }
        }
    }
}
