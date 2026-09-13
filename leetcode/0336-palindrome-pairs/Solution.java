import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    public List<List<Integer>> palindromePairs(String[] words) {
        Map<String, List<Integer>> indicesOf = new HashMap<>();
        for (int i = 0; i < words.length; i++) {
            indicesOf.computeIfAbsent(words[i], k -> new ArrayList<>()).add(i);
        }

        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            int n = word.length();
            for (int k = 0; k <= n; k++) {
                String left = word.substring(0, k);
                String right = word.substring(k);

                if (isPalindrome(left)) {
                    String revRight = new StringBuilder(right).reverse().toString();
                    for (int j : indicesOf.getOrDefault(revRight, List.of())) {
                        if (j != i) result.add(List.of(j, i));
                    }
                }

                if (k != n && isPalindrome(right)) {
                    String revLeft = new StringBuilder(left).reverse().toString();
                    for (int j : indicesOf.getOrDefault(revLeft, List.of())) {
                        if (j != i) result.add(List.of(i, j));
                    }
                }
            }
        }
        return result;
    }

    private boolean isPalindrome(String s) {
        int lo = 0, hi = s.length() - 1;
        while (lo < hi) {
            if (s.charAt(lo) != s.charAt(hi)) return false;
            lo++;
            hi--;
        }
        return true;
    }
}
