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
    private int rootVal;

    public int findSecondMinimumValue(TreeNode root) {
        if (root == null) {
            return -1;
        }
        rootVal = root.val;
        return dfs(root);
    }

    private int dfs(TreeNode node) {
        if (node == null) {
            return -1;
        }
        if (node.val != rootVal) {
            return node.val;
        }
        int left = dfs(node.left);
        int right = dfs(node.right);
        if (left == -1) {
            return right;
        }
        if (right == -1) {
            return left;
        }
        return Math.min(left, right);
    }
}
