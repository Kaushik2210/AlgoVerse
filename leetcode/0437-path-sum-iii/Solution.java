import java.util.HashMap;
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
    private int targetSum;
    private int count;
    private Map<Long, Integer> prefixCounts;

    public int pathSum(TreeNode root, int targetSum) {
        this.targetSum = targetSum;
        this.count = 0;
        this.prefixCounts = new HashMap<>();
        prefixCounts.put(0L, 1);
        dfs(root, 0L);
        return count;
    }

    private void dfs(TreeNode node, long runningSum) {
        if (node == null) {
            return;
        }
        runningSum += node.val;
        count += prefixCounts.getOrDefault(runningSum - targetSum, 0);
        prefixCounts.merge(runningSum, 1, Integer::sum);
        dfs(node.left, runningSum);
        dfs(node.right, runningSum);
        prefixCounts.merge(runningSum, -1, Integer::sum);
    }
}
