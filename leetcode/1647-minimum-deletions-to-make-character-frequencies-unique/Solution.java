import java.util.HashSet;
import java.util.Set;

class Solution {
    public int minDeletions(String s) {
        int[] freq = new int[26];
        for (char c : s.toCharArray()) {
            freq[c - 'a']++;
        }

        Set<Integer> used = new HashSet<>();
        int deletions = 0;

        for (int count : freq) {
            while (count > 0 && used.contains(count)) {
                count--;
                deletions++;
            }
            if (count > 0) {
                used.add(count);
            }
        }

        return deletions;
    }
}
