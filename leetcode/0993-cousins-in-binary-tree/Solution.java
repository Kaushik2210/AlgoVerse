import java.util.ArrayDeque;
import java.util.Queue;

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
    public boolean isCousins(TreeNode root, int x, int y) {
        Queue<TreeNode> nodeQueue = new ArrayDeque<>();
        Queue<TreeNode> parentQueue = new ArrayDeque<>();
        nodeQueue.add(root);
        parentQueue.add(null);

        while (!nodeQueue.isEmpty()) {
            int levelSize = nodeQueue.size();
            TreeNode foundParentX = null;
            TreeNode foundParentY = null;
            boolean foundX = false;
            boolean foundY = false;

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = nodeQueue.poll();
                TreeNode parent = parentQueue.poll();

                if (node.val == x) {
                    foundX = true;
                    foundParentX = parent;
                }
                if (node.val == y) {
                    foundY = true;
                    foundParentY = parent;
                }

                if (node.left != null) {
                    nodeQueue.add(node.left);
                    parentQueue.add(node);
                }
                if (node.right != null) {
                    nodeQueue.add(node.right);
                    parentQueue.add(node);
                }
            }

            if (foundX && foundY) {
                return foundParentX != foundParentY;
            }
            if (foundX || foundY) {
                return false;
            }
        }

        return false;
    }
}
