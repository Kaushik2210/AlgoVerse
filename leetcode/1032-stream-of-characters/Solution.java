import java.util.HashMap;
import java.util.Map;
import java.util.ArrayDeque;
import java.util.Deque;

class StreamChecker {
    private static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isWord = false;
    }

    private final TrieNode root = new TrieNode();
    private final Deque<Character> stream = new ArrayDeque<>();
    private int maxLen = 0;

    public StreamChecker(String[] words) {
        for (String w : words) {
            maxLen = Math.max(maxLen, w.length());
            TrieNode node = root;
            for (int i = w.length() - 1; i >= 0; i--) {
                char ch = w.charAt(i);
                node = node.children.computeIfAbsent(ch, c -> new TrieNode());
            }
            node.isWord = true;
        }
    }

    public boolean query(char letter) {
        stream.addLast(letter);
        while (stream.size() > maxLen) stream.removeFirst();

        TrieNode node = root;
        for (char ch : reverseView()) {
            TrieNode next = node.children.get(ch);
            if (next == null) return false;
            node = next;
            if (node.isWord) return true;
        }
        return false;
    }

    private Iterable<Character> reverseView() {
        java.util.List<Character> list = new java.util.ArrayList<>(stream);
        java.util.Collections.reverse(list);
        return list;
    }
}
