#include <climits>

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
    bool hasPrev = false;
    int prev = 0;
    int minDiff = INT_MAX;

    void inorder(TreeNode* node) {
        if (node == nullptr) return;
        inorder(node->left);
        if (hasPrev) {
            minDiff = std::min(minDiff, node->val - prev);
        }
        prev = node->val;
        hasPrev = true;
        inorder(node->right);
    }

public:
    int getMinimumDifference(TreeNode* root) {
        inorder(root);
        return minDiff;
    }
};
