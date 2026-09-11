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
    public void flatten(TreeNode root) {
        TreeNode node = root;

        while (node != null) {
            if (node.left != null) {
                // find the rightmost node of the left subtree
                TreeNode rightmost = node.left;
                while (rightmost.right != null) {
                    rightmost = rightmost.right;
                }

                // graft the original right subtree onto that rightmost node
                rightmost.right = node.right;

                // the left subtree becomes the new right subtree, left is cleared
                node.right = node.left;
                node.left = null;
            }

            node = node.right;
        }
    }
}
