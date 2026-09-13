import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    private final Map<String, String> parent = new HashMap<>();

    public boolean areSentencesSimilarTwo(String[] sentence1, String[] sentence2, List<List<String>> similarPairs) {
        if (sentence1.length != sentence2.length) {
            return false;
        }

        for (List<String> pair : similarPairs) {
            union(pair.get(0), pair.get(1));
        }

        for (int i = 0; i < sentence1.length; i++) {
            String w1 = sentence1[i];
            String w2 = sentence2[i];
            if (w1.equals(w2)) {
                continue;
            }
            if (!find(w1).equals(find(w2))) {
                return false;
            }
        }

        return true;
    }

    private String find(String word) {
        parent.putIfAbsent(word, word);
        while (!parent.get(word).equals(word)) {
            parent.put(word, parent.get(parent.get(word)));
            word = parent.get(word);
        }
        return word;
    }

    private void union(String a, String b) {
        String ra = find(a);
        String rb = find(b);
        if (!ra.equals(rb)) {
            parent.put(ra, rb);
        }
    }
}
