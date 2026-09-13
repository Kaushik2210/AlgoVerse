#include <algorithm>
using namespace std;

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
    int longestConsecutive(TreeNode* root) {
        best = 0;
        dfs(root);
        return best;
    }

private:
    int best;

    int dfs(TreeNode* node) {
        if (node == nullptr) {
            return 0;
        }
        int length = 1;
        if (node->left != nullptr) {
            int leftLen = dfs(node->left);
            if (node->left->val == node->val + 1) {
                length = max(length, 1 + leftLen);
            }
        }
        if (node->right != nullptr) {
            int rightLen = dfs(node->right);
            if (node->right->val == node->val + 1) {
                length = max(length, 1 + rightLen);
            }
        }
        best = max(best, length);
        return length;
    }
};
