import java.util.HashSet;
import java.util.Set;

class Solution {
    public int minimumLengthEncoding(String[] words) {
        Set<String> wordSet = new HashSet<>();
        for (String w : words) wordSet.add(w);

        for (String word : words) {
            for (int k = 1; k < word.length(); k++) {
                wordSet.remove(word.substring(k));
            }
        }

        int total = 0;
        for (String word : wordSet) {
            total += word.length() + 1;
        }
        return total;
    }
}
