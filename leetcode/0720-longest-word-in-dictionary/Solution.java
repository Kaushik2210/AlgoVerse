import java.util.HashSet;
import java.util.Set;

class Solution {
    public String longestWord(String[] words) {
        Set<String> wordSet = new HashSet<>();
        for (String w : words) wordSet.add(w);

        String best = "";
        for (String word : words) {
            boolean buildable = true;
            for (int i = 1; i <= word.length(); i++) {
                if (!wordSet.contains(word.substring(0, i))) {
                    buildable = false;
                    break;
                }
            }
            if (buildable) {
                if (word.length() > best.length() || (word.length() == best.length() && word.compareTo(best) < 0)) {
                    best = word;
                }
            }
        }
        return best;
    }
}
