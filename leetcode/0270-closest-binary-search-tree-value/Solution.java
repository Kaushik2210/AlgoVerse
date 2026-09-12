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
    public int closestValue(TreeNode root, double target) {
        int closest = root.val;
        TreeNode node = root;

        while (node != null) {
            if (Math.abs(node.val - target) < Math.abs(closest - target)) {
                closest = node.val;
            }
            node = target < node.val ? node.left : node.right;
        }

        return closest;
    }
}
