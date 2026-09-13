import java.util.*;

class Solution {
    public String frequencySort(String s) {
        Map<Character, Integer> counts = new HashMap<>();
        for (char c : s.toCharArray()) {
            counts.merge(c, 1, Integer::sum);
        }

        List<Character> chars = new ArrayList<>(counts.keySet());
        chars.sort((a, b) -> counts.get(b) - counts.get(a));

        StringBuilder sb = new StringBuilder();
        for (char c : chars) {
            for (int i = 0; i < counts.get(c); i++) {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}
