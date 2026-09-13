import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
    public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {
        Set<Integer> toDeleteSet = new HashSet<>();
        for (int v : to_delete) toDeleteSet.add(v);

        List<TreeNode> result = new ArrayList<>();
        dfs(root, true, toDeleteSet, result);
        return result;
    }

    private TreeNode dfs(TreeNode node, boolean isRoot, Set<Integer> toDelete, List<TreeNode> result) {
        if (node == null) return null;

        boolean deleted = toDelete.contains(node.val);
        if (isRoot && !deleted) {
            result.add(node);
        }

        node.left = dfs(node.left, deleted, toDelete, result);
        node.right = dfs(node.right, deleted, toDelete, result);

        return deleted ? null : node;
    }
}
