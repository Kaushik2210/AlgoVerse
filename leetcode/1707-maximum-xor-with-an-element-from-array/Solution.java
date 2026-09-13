import java.util.Arrays;

class Solution {
    private static final int BITS = 30; // nums[i], x_i <= 10^9 < 2^30

    private static class TrieNode {
        TrieNode[] children = new TrieNode[2];
    }

    public int[] maximizeXor(int[] nums, int[][] queries) {
        Arrays.sort(nums);
        int n = nums.length;
        int q = queries.length;

        Integer[] order = new Integer[q];
        for (int i = 0; i < q; i++) order[i] = i;
        Arrays.sort(order, (a, b) -> queries[a][1] - queries[b][1]);

        TrieNode root = new TrieNode();
        int[] answer = new int[q];
        Arrays.fill(answer, -1);

        int idx = 0;
        for (int qi : order) {
            int x = queries[qi][0];
            int m = queries[qi][1];
            while (idx < n && nums[idx] <= m) {
                insert(root, nums[idx]);
                idx++;
            }
            if (idx == 0) {
                answer[qi] = -1;
            } else {
                answer[qi] = queryMaxXor(root, x);
            }
        }
        return answer;
    }

    private void insert(TrieNode root, int num) {
        TrieNode node = root;
        for (int b = BITS; b >= 0; b--) {
            int bit = (num >> b) & 1;
            if (node.children[bit] == null) node.children[bit] = new TrieNode();
            node = node.children[bit];
        }
    }

    private int queryMaxXor(TrieNode root, int x) {
        TrieNode node = root;
        int result = 0;
        for (int b = BITS; b >= 0; b--) {
            int bit = (x >> b) & 1;
            int want = 1 - bit;
            if (node.children[want] != null) {
                result |= (1 << b);
                node = node.children[want];
            } else {
                node = node.children[bit];
            }
        }
        return result;
    }
}
