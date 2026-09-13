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
    public List<List<Integer>> verticalTraversal(TreeNode root) {
        List<int[]> triples = new ArrayList<>();
        dfs(root, 0, 0, triples);

        triples.sort((a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            if (a[1] != b[1]) return Integer.compare(a[1], b[1]);
            return Integer.compare(a[2], b[2]);
        });

        List<List<Integer>> result = new ArrayList<>();
        Integer currentCol = null;
        for (int[] triple : triples) {
            int col = triple[0], val = triple[2];
            if (currentCol == null || col != currentCol) {
                result.add(new ArrayList<>());
                currentCol = col;
            }
            result.get(result.size() - 1).add(val);
        }

        return result;
    }

    private void dfs(TreeNode node, int row, int col, List<int[]> triples) {
        if (node == null) {
            return;
        }
        triples.add(new int[]{col, row, node.val});
        dfs(node.left, row + 1, col - 1, triples);
        dfs(node.right, row + 1, col + 1, triples);
    }
}
