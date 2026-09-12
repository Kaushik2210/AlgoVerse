import java.util.HashMap;
import java.util.Map;

class MapSum {
    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        int sum = 0;
    }

    private final TrieNode root = new TrieNode();
    private final Map<String, Integer> keyValues = new HashMap<>();

    public MapSum() {
    }

    public void insert(String key, int val) {
        int delta = val - keyValues.getOrDefault(key, 0);
        keyValues.put(key, val);

        TrieNode node = root;
        node.sum += delta;
        for (char ch : key.toCharArray()) {
            node = node.children.computeIfAbsent(ch, k -> new TrieNode());
            node.sum += delta;
        }
    }

    public int sum(String prefix) {
        TrieNode node = root;
        for (char ch : prefix.toCharArray()) {
            if (!node.children.containsKey(ch)) {
                return 0;
            }
            node = node.children.get(ch);
        }
        return node.sum;
    }
}
