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
    private int leftSize = 0;
    private int rightSize = 0;

    public boolean btreeGameWinningMove(TreeNode root, int n, int x) {
        count(root, x);
        int parentSize = n - leftSize - rightSize - 1;
        return Math.max(parentSize, Math.max(leftSize, rightSize)) > n / 2;
    }

    private int count(TreeNode node, int x) {
        if (node == null) return 0;
        int left = count(node.left, x);
        int right = count(node.right, x);
        if (node.val == x) {
            leftSize = left;
            rightSize = right;
        }
        return left + right + 1;
    }
}
