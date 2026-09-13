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

    // returns {longest increasing run down from this node, longest decreasing run down}
    private int[] dfs(TreeNode node) {
        if (node == null) {
            return new int[]{0, 0};
        }
        int incr = 1, decr = 1;
        if (node.left != null) {
            int[] left = dfs(node.left);
            if (node.left.val == node.val + 1) {
                incr = Math.max(incr, 1 + left[0]);
            } else if (node.left.val == node.val - 1) {
                decr = Math.max(decr, 1 + left[1]);
            }
        }
        if (node.right != null) {
            int[] right = dfs(node.right);
            if (node.right.val == node.val + 1) {
                incr = Math.max(incr, 1 + right[0]);
            } else if (node.right.val == node.val - 1) {
                decr = Math.max(decr, 1 + right[1]);
            }
        }
        best = Math.max(best, incr + decr - 1);
        return new int[]{incr, decr};
    }
}
