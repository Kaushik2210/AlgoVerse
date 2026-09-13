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
    public boolean isValidSequence(TreeNode root, int[] arr) {
        return dfs(root, arr, 0);
    }

    private boolean dfs(TreeNode node, int[] arr, int i) {
        if (node == null || i >= arr.length || node.val != arr[i]) {
            return false;
        }
        if (i == arr.length - 1) {
            return node.left == null && node.right == null;
        }
        return dfs(node.left, arr, i + 1) || dfs(node.right, arr, i + 1);
    }
}
