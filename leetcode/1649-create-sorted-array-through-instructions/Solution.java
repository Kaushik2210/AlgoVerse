class Solution {
    public int createSortedArray(int[] instructions) {
        final int MOD = 1_000_000_007;
        int maxVal = 0;
        for (int v : instructions) maxVal = Math.max(maxVal, v);

        int[] tree = new int[maxVal + 1];
        long cost = 0;

        for (int i = 0; i < instructions.length; i++) {
            int value = instructions[i];
            int less = query(tree, value - 1);
            int greater = i - query(tree, value);
            cost += Math.min(less, greater);
            update(tree, value, maxVal);
        }

        return (int) (cost % MOD);
    }

    private void update(int[] tree, int i, int size) {
        while (i <= size) {
            tree[i]++;
            i += i & (-i);
        }
    }

    private int query(int[] tree, int i) {
        int total = 0;
        while (i > 0) {
            total += tree[i];
            i -= i & (-i);
        }
        return total;
    }
}
