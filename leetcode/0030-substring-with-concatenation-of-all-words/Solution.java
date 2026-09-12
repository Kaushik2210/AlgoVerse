import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        List<Integer> result = new ArrayList<>();
        if (s == null || s.isEmpty() || words == null || words.length == 0) {
            return result;
        }

        int wordLen = words[0].length();
        int numWords = words.length;
        int windowLen = wordLen * numWords;

        if (windowLen > s.length()) {
            return result;
        }

        Map<String, Integer> wordCount = new HashMap<>();
        for (String w : words) {
            wordCount.merge(w, 1, Integer::sum);
        }

        for (int start = 0; start <= s.length() - windowLen; start++) {
            Map<String, Integer> seen = new HashMap<>();
            boolean ok = true;

            for (int i = 0; i < numWords; i++) {
                int chunkStart = start + i * wordLen;
                String chunk = s.substring(chunkStart, chunkStart + wordLen);

                if (!wordCount.containsKey(chunk)) {
                    ok = false;
                    break;
                }

                int count = seen.merge(chunk, 1, Integer::sum);
                if (count > wordCount.get(chunk)) {
                    ok = false;
                    break;
                }
            }

            if (ok) {
                result.add(start);
            }
        }

        return result;
    }
}
