import java.util.HashMap;
import java.util.Map;

class WordFilter {
    private static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        int maxIndex = -1;
    }

    private final TrieNode root = new TrieNode();

    public WordFilter(String[] words) {
        for (int index = 0; index < words.length; index++) {
            String word = words[index];
            for (int k = 0; k <= word.length(); k++) {
                String combo = word.substring(k) + "#" + word;
                TrieNode node = root;
                node.maxIndex = index;
                for (char ch : combo.toCharArray()) {
                    node = node.children.computeIfAbsent(ch, c -> new TrieNode());
                    node.maxIndex = index;
                }
            }
        }
    }

    public int f(String prefix, String suffix) {
        String combo = suffix + "#" + prefix;
        TrieNode node = root;
        for (char ch : combo.toCharArray()) {
            node = node.children.get(ch);
            if (node == null) return -1;
        }
        return node.maxIndex;
    }
}
