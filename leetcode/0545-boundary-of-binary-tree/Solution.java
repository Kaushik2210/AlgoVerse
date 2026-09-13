import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
    public List<Integer> boundaryOfBinaryTree(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        if (!isLeaf(root)) {
            result.add(root.val);
        }

        TreeNode node = root.left;
        while (node != null) {
            if (!isLeaf(node)) {
                result.add(node.val);
            }
            node = node.left != null ? node.left : node.right;
        }

        collectLeaves(root, result);

        List<Integer> rightBoundary = new ArrayList<>();
        node = root.right;
        while (node != null) {
            if (!isLeaf(node)) {
                rightBoundary.add(node.val);
            }
            node = node.right != null ? node.right : node.left;
        }
        Collections.reverse(rightBoundary);
        result.addAll(rightBoundary);

        return result;
    }

    private boolean isLeaf(TreeNode node) {
        return node.left == null && node.right == null;
    }

    private void collectLeaves(TreeNode node, List<Integer> result) {
        if (node == null) {
            return;
        }
        if (isLeaf(node)) {
            result.add(node.val);
            return;
        }
        collectLeaves(node.left, result);
        collectLeaves(node.right, result);
    }
}
