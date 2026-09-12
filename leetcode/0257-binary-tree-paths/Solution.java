import java.util.ArrayList;
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
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> paths = new ArrayList<>();
        dfs(root, "", paths);
        return paths;
    }

    private void dfs(TreeNode node, String path, List<String> paths) {
        if (node == null) {
            return;
        }

        String current = path.isEmpty() ? String.valueOf(node.val) : path + "->" + node.val;

        if (node.left == null && node.right == null) {
            paths.add(current);
            return;
        }

        dfs(node.left, current, paths);
        dfs(node.right, current, paths);
    }
}
