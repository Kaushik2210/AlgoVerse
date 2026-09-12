import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        String word = null;
    }

    private char[][] board;
    private int rows, cols;
    private List<String> result;

    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (String word : words) {
            TrieNode node = root;
            for (char c : word.toCharArray()) {
                node = node.children.computeIfAbsent(c, k -> new TrieNode());
            }
            node.word = word;
        }

        this.board = board;
        this.rows = board.length;
        this.cols = board[0].length;
        this.result = new ArrayList<>();

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                dfs(r, c, root);
            }
        }

        return result;
    }

    private void dfs(int r, int c, TrieNode node) {
        char ch = board[r][c];
        TrieNode child = node.children.get(ch);
        if (child == null) {
            return;
        }

        if (child.word != null) {
            result.add(child.word);
            child.word = null;
        }

        board[r][c] = '#';
        int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] != '#') {
                dfs(nr, nc, child);
            }
        }
        board[r][c] = ch;

        if (child.children.isEmpty()) {
            node.children.remove(ch);
        }
    }
}
