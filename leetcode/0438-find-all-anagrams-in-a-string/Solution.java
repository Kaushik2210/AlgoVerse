import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int n1 = p.length(), n2 = s.length();
        List<Integer> result = new ArrayList<>();
        if (n1 > n2) {
            return result;
        }

        int[] need = new int[26];
        int[] window = new int[26];

        for (int i = 0; i < n1; i++) {
            need[p.charAt(i) - 'a']++;
            window[s.charAt(i) - 'a']++;
        }

        if (Arrays.equals(need, window)) {
            result.add(0);
        }

        for (int i = n1; i < n2; i++) {
            window[s.charAt(i) - 'a']++;
            window[s.charAt(i - n1) - 'a']--;
            if (Arrays.equals(need, window)) {
                result.add(i - n1 + 1);
            }
        }

        return result;
    }
}
