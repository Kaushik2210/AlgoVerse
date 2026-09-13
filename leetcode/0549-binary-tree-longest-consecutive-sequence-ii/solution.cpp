#include <algorithm>
#include <utility>
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

    pair<int, int> dfs(TreeNode* node) {
        if (node == nullptr) {
            return {0, 0};
        }
        int incr = 1, decr = 1;
        if (node->left != nullptr) {
            auto left = dfs(node->left);
            if (node->left->val == node->val + 1) {
                incr = max(incr, 1 + left.first);
            } else if (node->left->val == node->val - 1) {
                decr = max(decr, 1 + left.second);
            }
        }
        if (node->right != nullptr) {
            auto right = dfs(node->right);
            if (node->right->val == node->val + 1) {
                incr = max(incr, 1 + right.first);
            } else if (node->right->val == node->val - 1) {
                decr = max(decr, 1 + right.second);
            }
        }
        best = max(best, incr + decr - 1);
        return {incr, decr};
    }
};
