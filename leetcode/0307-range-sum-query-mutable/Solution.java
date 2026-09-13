class NumArray {
    private int n;
    private int[] nums;
    private int[] tree;

    public NumArray(int[] nums) {
        this.n = nums.length;
        this.nums = nums.clone();
        this.tree = new int[n + 1];
        for (int i = 0; i < n; i++) {
            add(i, nums[i]);
        }
    }

    private void add(int index, int delta) {
        int i = index + 1;
        while (i <= n) {
            tree[i] += delta;
            i += i & (-i);
        }
    }

    private int prefixSum(int index) {
        int total = 0;
        int i = index + 1;
        while (i > 0) {
            total += tree[i];
            i -= i & (-i);
        }
        return total;
    }

    public void update(int index, int val) {
        int delta = val - nums[index];
        nums[index] = val;
        add(index, delta);
    }

    public int sumRange(int left, int right) {
        if (left == 0) {
            return prefixSum(right);
        }
        return prefixSum(right) - prefixSum(left - 1);
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray obj = new NumArray(nums);
 * obj.update(index,val);
 * int param_2 = obj.sumRange(left,right);
 */
