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
    private int[] preorder;
    private int i;

    public TreeNode bstFromPreorder(int[] preorder) {
        this.preorder = preorder;
        this.i = 0;
        return build(Long.MAX_VALUE);
    }

    private TreeNode build(long bound) {
        if (i == preorder.length || preorder[i] > bound) {
            return null;
        }
        TreeNode node = new TreeNode(preorder[i]);
        i++;
        node.left = build(node.val);
        node.right = build(bound);
        return node;
    }
}
