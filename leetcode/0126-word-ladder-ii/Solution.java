import java.util.*;

class Solution {
    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        List<List<String>> results = new ArrayList<>();
        if (!wordSet.contains(endWord)) {
            return results;
        }

        Map<String, Set<String>> parents = new HashMap<>();
        Set<String> currentLayer = new HashSet<>();
        currentLayer.add(beginWord);
        wordSet.remove(beginWord);
        boolean found = false;

        while (!currentLayer.isEmpty() && !found) {
            Map<String, Set<String>> nextLayer = new HashMap<>();

            for (String word : currentLayer) {
                char[] chars = word.toCharArray();
                for (int i = 0; i < chars.length; i++) {
                    char original = chars[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        chars[i] = c;
                        String candidate = new String(chars);
                        if (wordSet.contains(candidate)) {
                            nextLayer.computeIfAbsent(candidate, k -> new HashSet<>()).add(word);
                        }
                    }
                    chars[i] = original;
                }
            }

            for (String word : nextLayer.keySet()) {
                wordSet.remove(word);
                parents.computeIfAbsent(word, k -> new HashSet<>()).addAll(nextLayer.get(word));
                if (word.equals(endWord)) {
                    found = true;
                }
            }

            currentLayer = nextLayer.keySet();
        }

        if (!found) {
            return results;
        }

        LinkedList<String> path = new LinkedList<>();
        path.add(endWord);
        backtrack(endWord, beginWord, parents, path, results);
        return results;
    }

    private void backtrack(String word, String beginWord, Map<String, Set<String>> parents,
                            LinkedList<String> path, List<List<String>> results) {
        if (word.equals(beginWord)) {
            results.add(new ArrayList<>(path));
            return;
        }
        for (String parent : parents.getOrDefault(word, Collections.emptySet())) {
            path.addFirst(parent);
            backtrack(parent, beginWord, parents, path, results);
            path.removeFirst();
        }
    }
}
