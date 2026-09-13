class Solution {
    class TrieNode {
        TrieNode[] children = new TrieNode[2];
    }

    private TrieNode root;
    private int maxBit;

    public int findMaximumXOR(int[] nums) {
        int maxVal = 0;
        for (int num : nums) {
            maxVal = Math.max(maxVal, num);
        }
        maxBit = 32 - Integer.numberOfLeadingZeros(Math.max(maxVal, 1));
        if (maxVal == 0) {
            maxBit = 0;
        }
        root = new TrieNode();

        for (int num : nums) {
            insert(num);
        }

        int best = 0;
        for (int num : nums) {
            best = Math.max(best, query(num));
        }
        return best;
    }

    private void insert(int num) {
        TrieNode node = root;
        for (int i = maxBit - 1; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (node.children[bit] == null) {
                node.children[bit] = new TrieNode();
            }
            node = node.children[bit];
        }
    }

    private int query(int num) {
        TrieNode node = root;
        int result = 0;
        for (int i = maxBit - 1; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int want = 1 - bit;
            if (node.children[want] != null) {
                result |= (1 << i);
                node = node.children[want];
            } else {
                node = node.children[bit];
            }
        }
        return result;
    }
}
