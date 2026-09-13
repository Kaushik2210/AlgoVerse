import java.util.*;

class Solution {
    public List<String> topKFrequent(String[] words, int k) {
        Map<String, Integer> counts = new HashMap<>();
        for (String w : words) {
            counts.merge(w, 1, Integer::sum);
        }

        List<String> unique = new ArrayList<>(counts.keySet());
        unique.sort((a, b) -> {
            int diff = counts.get(b) - counts.get(a);
            if (diff != 0) return diff;
            return a.compareTo(b);
        });

        return unique.subList(0, k);
    }
}
