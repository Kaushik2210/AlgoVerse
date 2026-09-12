#include <algorithm>
#include <climits>
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
    int maxPathSum(TreeNode* root) {
        best = INT_MIN;
        dfs(root);
        return best;
    }

private:
    int best;

    int dfs(TreeNode* node) {
        if (node == nullptr) {
            return 0;
        }

        int left = max(dfs(node->left), 0);
        int right = max(dfs(node->right), 0);

        best = max(best, node->val + left + right);

        return node->val + max(left, right);
    }
};
