import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

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
public class Codec {
    public String serialize(TreeNode root) {
        StringJoiner joiner = new StringJoiner(",");
        preorder(root, joiner);
        return joiner.toString();
    }

    private void preorder(TreeNode node, StringJoiner joiner) {
        if (node == null) {
            return;
        }
        joiner.add(String.valueOf(node.val));
        preorder(node.left, joiner);
        preorder(node.right, joiner);
    }

    private int index;
    private List<Integer> values;

    public TreeNode deserialize(String data) {
        if (data.isEmpty()) {
            return null;
        }

        values = new ArrayList<>();
        for (String v : data.split(",")) {
            values.add(Integer.parseInt(v));
        }
        index = 0;

        return build(Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private TreeNode build(long lower, long upper) {
        if (index == values.size() || !(lower < values.get(index) && values.get(index) < upper)) {
            return null;
        }

        int val = values.get(index);
        index++;
        TreeNode node = new TreeNode(val);
        node.left = build(lower, val);
        node.right = build(val, upper);
        return node;
    }
}

/**
 * Your Codec object will be instantiated and called as such:
 * Codec ser = new Codec();
 * Codec deser = new Codec();
 * TreeNode tree = deser.deserialize(ser.serialize(root));
 */
