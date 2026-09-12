import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.Set;
import java.util.HashSet;

class Solution {
    private Set<String> words;
    private Map<Integer, List<String>> memo;
    private String s;

    public List<String> wordBreak(String s, List<String> wordDict) {
        this.s = s;
        this.words = new HashSet<>(wordDict);
        this.memo = new HashMap<>();
        return breakFrom(0);
    }

    private List<String> breakFrom(int i) {
        if (memo.containsKey(i)) {
            return memo.get(i);
        }

        List<String> sentences = new ArrayList<>();
        if (i == s.length()) {
            sentences.add("");
            memo.put(i, sentences);
            return sentences;
        }

        for (int j = i + 1; j <= s.length(); j++) {
            String word = s.substring(i, j);
            if (words.contains(word)) {
                for (String rest : breakFrom(j)) {
                    sentences.add(rest.isEmpty() ? word : word + " " + rest);
                }
            }
        }

        memo.put(i, sentences);
        return sentences;
    }
}
