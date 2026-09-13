import java.util.ArrayDeque;
import java.util.Deque;

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
    private static class Item {
        TreeNode node;
        long index;

        Item(TreeNode node, long index) {
            this.node = node;
            this.index = index;
        }
    }

    public int widthOfBinaryTree(TreeNode root) {
        if (root == null) {
            return 0;
        }

        int maxWidth = 0;
        Deque<Item> queue = new ArrayDeque<>();
        queue.add(new Item(root, 0));

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            long firstIndex = queue.peek().index;
            long lastIndex = firstIndex;

            for (int i = 0; i < levelSize; i++) {
                Item item = queue.poll();
                long index = item.index - firstIndex;
                lastIndex = index;

                if (item.node.left != null) {
                    queue.add(new Item(item.node.left, 2 * index));
                }
                if (item.node.right != null) {
                    queue.add(new Item(item.node.right, 2 * index + 1));
                }
            }

            maxWidth = (int) Math.max(maxWidth, lastIndex + 1);
        }

        return maxWidth;
    }
}
