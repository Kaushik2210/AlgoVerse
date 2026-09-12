import java.util.HashMap;
import java.util.Map;

class FileSystem {
    class TrieNode {
        Map<String, TrieNode> children = new HashMap<>();
        int value = -1;
        boolean exists = false;
    }

    private final TrieNode root = new TrieNode();

    public FileSystem() {
        root.exists = true;
    }

    public boolean createPath(String path, int value) {
        String[] parts = path.split("/");
        // parts[0] is empty string before the leading '/'
        TrieNode node = root;
        for (int i = 1; i < parts.length - 1; i++) {
            TrieNode child = node.children.get(parts[i]);
            if (child == null || !child.exists) {
                return false;
            }
            node = child;
        }

        String last = parts[parts.length - 1];
        TrieNode existing = node.children.get(last);
        if (existing != null && existing.exists) {
            return false;
        }

        TrieNode child = node.children.computeIfAbsent(last, k -> new TrieNode());
        child.exists = true;
        child.value = value;
        return true;
    }

    public int get(String path) {
        String[] parts = path.split("/");
        TrieNode node = root;
        for (int i = 1; i < parts.length; i++) {
            TrieNode child = node.children.get(parts[i]);
            if (child == null || !child.exists) {
                return -1;
            }
            node = child;
        }
        return node.value;
    }
}
