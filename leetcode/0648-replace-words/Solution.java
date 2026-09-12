import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isEnd = false;
    }

    private TrieNode root = new TrieNode();

    public String replaceWords(List<String> dictionary, String sentence) {
        for (String word : dictionary) {
            TrieNode node = root;
            for (char ch : word.toCharArray()) {
                node = node.children.computeIfAbsent(ch, k -> new TrieNode());
            }
            node.isEnd = true;
        }

        StringBuilder result = new StringBuilder();
        for (String word : sentence.split(" ")) {
            if (result.length() > 0) {
                result.append(" ");
            }
            result.append(findRoot(word));
        }
        return result.toString();
    }

    private String findRoot(String word) {
        TrieNode node = root;
        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            if (!node.children.containsKey(ch)) {
                return word;
            }
            node = node.children.get(ch);
            if (node.isEnd) {
                return word.substring(0, i + 1);
            }
        }
        return word;
    }
}
