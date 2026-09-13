import java.util.HashSet;
import java.util.Set;

class Solution {
    public int maximumRemovals(String s, String p, int[] removable) {
        int n = s.length();
        int lo = 0, hi = removable.length;

        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (isSubsequence(s, p, removable, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    private boolean isSubsequence(String s, String p, int[] removable, int k) {
        Set<Integer> removed = new HashSet<>();
        for (int i = 0; i < k; i++) removed.add(removable[i]);

        int j = 0;
        for (int i = 0; i < s.length() && j < p.length(); i++) {
            if (removed.contains(i)) continue;
            if (s.charAt(i) == p.charAt(j)) j++;
        }
        return j == p.length();
    }
}
