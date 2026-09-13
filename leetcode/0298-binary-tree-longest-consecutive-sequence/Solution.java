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
    private int best = 0;

    public int longestConsecutive(TreeNode root) {
        dfs(root);
        return best;
    }

    private int dfs(TreeNode node) {
        if (node == null) {
            return 0;
        }
        int length = 1;
        if (node.left != null) {
            int leftLen = dfs(node.left);
            if (node.left.val == node.val + 1) {
                length = Math.max(length, 1 + leftLen);
            }
        }
        if (node.right != null) {
            int rightLen = dfs(node.right);
            if (node.right.val == node.val + 1) {
                length = Math.max(length, 1 + rightLen);
            }
        }
        best = Math.max(best, length);
        return length;
    }
}
