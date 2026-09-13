import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        Set<String> wordSet = new HashSet<>();
        for (String w : words) wordSet.add(w);

        List<String> result = new ArrayList<>();
        for (String w : words) {
            if (w.isEmpty()) continue;
            if (canBuild(w, wordSet)) result.add(w);
        }
        return result;
    }

    private boolean canBuild(String word, Set<String> wordSet) {
        int n = word.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (!dp[j]) continue;
                String piece = word.substring(j, i);
                if (piece.equals(word)) continue;
                if (wordSet.contains(piece)) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
}
