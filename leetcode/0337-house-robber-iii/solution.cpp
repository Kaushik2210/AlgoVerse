#include <algorithm>
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
    int rob(TreeNode* root) {
        auto [robbed, notRobbed] = helper(root);
        return max(robbed, notRobbed);
    }

private:
    pair<int, int> helper(TreeNode* node) {
        if (node == nullptr) {
            return {0, 0};
        }

        auto [leftRobbed, leftNot] = helper(node->left);
        auto [rightRobbed, rightNot] = helper(node->right);

        int robbed = node->val + leftNot + rightNot;
        int notRobbed = max(leftRobbed, leftNot) + max(rightRobbed, rightNot);

        return {robbed, notRobbed};
    }
};
