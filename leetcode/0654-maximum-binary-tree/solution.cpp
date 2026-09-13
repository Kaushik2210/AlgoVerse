#include <vector>
using namespace std;

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    TreeNode* constructMaximumBinaryTree(vector<int>& nums) {
        return build(nums, 0, (int)nums.size() - 1);
    }

private:
    TreeNode* build(vector<int>& nums, int lo, int hi) {
        if (lo > hi) return nullptr;

        int maxIdx = lo;
        for (int i = lo + 1; i <= hi; i++) {
            if (nums[i] > nums[maxIdx]) {
                maxIdx = i;
            }
        }

        TreeNode* node = new TreeNode(nums[maxIdx]);
        node->left = build(nums, lo, maxIdx - 1);
        node->right = build(nums, maxIdx + 1, hi);
        return node;
    }
};
