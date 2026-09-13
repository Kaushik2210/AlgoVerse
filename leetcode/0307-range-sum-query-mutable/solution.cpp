#include <vector>
using namespace std;

class NumArray {
public:
    NumArray(vector<int>& nums) {
        n = nums.size();
        this->nums = nums;
        tree.assign(n + 1, 0);
        for (int i = 0; i < n; i++) {
            add(i, nums[i]);
        }
    }

    void update(int index, int val) {
        int delta = val - nums[index];
        nums[index] = val;
        add(index, delta);
    }

    int sumRange(int left, int right) {
        if (left == 0) {
            return prefixSum(right);
        }
        return prefixSum(right) - prefixSum(left - 1);
    }

private:
    int n;
    vector<int> nums;
    vector<int> tree;

    void add(int index, int delta) {
        int i = index + 1;
        while (i <= n) {
            tree[i] += delta;
            i += i & (-i);
        }
    }

    int prefixSum(int index) {
        int total = 0;
        int i = index + 1;
        while (i > 0) {
            total += tree[i];
            i -= i & (-i);
        }
        return total;
    }
};

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray* obj = new NumArray(nums);
 * obj->update(index,val);
 * int param_2 = obj->sumRange(left,right);
 */
