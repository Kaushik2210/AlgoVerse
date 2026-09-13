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
    private final Map<Integer, Integer> counts = new HashMap<>();

    public int[] findFrequentTreeSum(TreeNode root) {
        dfs(root);
        if (counts.isEmpty()) {
            return new int[]{};
        }
        int maxFreq = 0;
        for (int f : counts.values()) {
            maxFreq = Math.max(maxFreq, f);
        }
        List<Integer> result = new ArrayList<>();
        for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
            if (e.getValue() == maxFreq) {
                result.add(e.getKey());
            }
        }
        int[] arr = new int[result.size()];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = result.get(i);
        }
        return arr;
    }

    private int dfs(TreeNode node) {
        if (node == null) {
            return 0;
        }
        int total = node.val + dfs(node.left) + dfs(node.right);
        counts.merge(total, 1, Integer::sum);
        return total;
    }
}
