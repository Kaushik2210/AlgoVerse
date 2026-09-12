import java.util.HashMap;
import java.util.Map;

class Solution {
    public int lengthOfLongestSubstringKDistinct(String s, int k) {
        if (k == 0) {
            return 0;
        }

        Map<Character, Integer> counts = new HashMap<>();
        int left = 0, best = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            counts.put(ch, counts.getOrDefault(ch, 0) + 1);

            while (counts.size() > k) {
                char leftCh = s.charAt(left);
                counts.put(leftCh, counts.get(leftCh) - 1);
                if (counts.get(leftCh) == 0) {
                    counts.remove(leftCh);
                }
                left++;
            }

            best = Math.max(best, right - left + 1);
        }

        return best;
    }
}
