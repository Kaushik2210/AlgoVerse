/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    private String s;
    private int i;

    public TreeNode str2tree(String s) {
        if (s == null || s.isEmpty()) {
            return null;
        }
        this.s = s;
        this.i = 0;
        return parseNode();
    }

    private int parseInt() {
        int start = i;
        if (s.charAt(i) == '-') {
            i++;
        }
        while (i < s.length() && Character.isDigit(s.charAt(i))) {
            i++;
        }
        return Integer.parseInt(s.substring(start, i));
    }

    private TreeNode parseNode() {
        int val = parseInt();
        TreeNode node = new TreeNode(val);

        if (i < s.length() && s.charAt(i) == '(') {
            i++; // consume '('
            node.left = parseNode();
            i++; // consume ')'
        }

        if (i < s.length() && s.charAt(i) == '(') {
            i++; // consume '('
            node.right = parseNode();
            i++; // consume ')'
        }

        return node;
    }
}
