import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private final Map<String, Integer> counts = new HashMap<>();
    private final List<TreeNode> result = new ArrayList<>();

    public List<TreeNode> findDuplicateSubtrees(TreeNode root) {
        serialize(root);
        return result;
    }

    private String serialize(TreeNode node) {
        if (node == null) {
            return "#";
        }

        String left = serialize(node.left);
        String right = serialize(node.right);
        String key = node.val + "," + left + "," + right;

        int count = counts.merge(key, 1, Integer::sum);
        if (count == 2) {
            result.add(node);
        }

        return key;
    }
}
