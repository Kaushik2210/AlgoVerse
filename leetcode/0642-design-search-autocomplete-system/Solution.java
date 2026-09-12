import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class AutocompleteSystem {
    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        Map<String, Integer> sentenceCounts = new HashMap<>();
    }

    private final TrieNode root = new TrieNode();
    private final Map<String, Integer> freq = new HashMap<>();
    private StringBuilder currentPrefix = new StringBuilder();
    private TrieNode currentNode = root;
    private boolean fellOff = false;

    public AutocompleteSystem(String[] sentences, int[] times) {
        for (int i = 0; i < sentences.length; i++) {
            freq.put(sentences[i], times[i]);
            insert(sentences[i], times[i]);
        }
    }

    private void insert(String sentence, int count) {
        TrieNode node = root;
        for (char ch : sentence.toCharArray()) {
            node = node.children.computeIfAbsent(ch, k -> new TrieNode());
            node.sentenceCounts.put(sentence, count);
        }
    }

    public List<String> input(char c) {
        if (c == '#') {
            String sentence = currentPrefix.toString();
            freq.put(sentence, freq.getOrDefault(sentence, 0) + 1);
            insert(sentence, freq.get(sentence));
            currentPrefix = new StringBuilder();
            currentNode = root;
            fellOff = false;
            return new ArrayList<>();
        }

        currentPrefix.append(c);
        if (fellOff) {
            return new ArrayList<>();
        }

        if (!currentNode.children.containsKey(c)) {
            fellOff = true;
            return new ArrayList<>();
        }

        currentNode = currentNode.children.get(c);
        List<Map.Entry<String, Integer>> candidates = new ArrayList<>(currentNode.sentenceCounts.entrySet());
        candidates.sort((a, b) -> {
            if (!a.getValue().equals(b.getValue())) {
                return b.getValue() - a.getValue();
            }
            return a.getKey().compareTo(b.getKey());
        });

        List<String> result = new ArrayList<>();
        for (int i = 0; i < Math.min(3, candidates.size()); i++) {
            result.add(candidates.get(i).getKey());
        }
        return result;
    }
}
