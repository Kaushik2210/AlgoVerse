import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
    public boolean areSentencesSimilar(String[] sentence1, String[] sentence2, List<List<String>> similarPairs) {
        if (sentence1.length != sentence2.length) {
            return false;
        }

        Set<String> similar = new HashSet<>();
        for (List<String> pair : similarPairs) {
            similar.add(pair.get(0) + "#" + pair.get(1));
            similar.add(pair.get(1) + "#" + pair.get(0));
        }

        for (int i = 0; i < sentence1.length; i++) {
            String w1 = sentence1[i];
            String w2 = sentence2[i];
            if (w1.equals(w2)) {
                continue;
            }
            if (!similar.contains(w1 + "#" + w2)) {
                return false;
            }
        }

        return true;
    }
}
