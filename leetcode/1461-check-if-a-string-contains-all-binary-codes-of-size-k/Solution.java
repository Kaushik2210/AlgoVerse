import java.util.HashSet;
import java.util.Set;

class Solution {
    public boolean hasAllCodes(String s, int k) {
        int need = 1 << k;
        if (s.length() - k + 1 < need) {
            return false;
        }

        Set<Integer> seen = new HashSet<>();
        int window = 0;
        int mask = need - 1;

        for (int i = 0; i < s.length(); i++) {
            window = ((window << 1) | (s.charAt(i) - '0')) & mask;
            if (i >= k - 1) {
                seen.add(window);
            }
        }

        return seen.size() == need;
    }
}
