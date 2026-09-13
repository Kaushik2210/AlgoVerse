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
    int findSecondMinimumValue(TreeNode* root) {
        if (root == nullptr) {
            return -1;
        }
        rootVal = root->val;
        return dfs(root);
    }

private:
    int rootVal;

    int dfs(TreeNode* node) {
        if (node == nullptr) {
            return -1;
        }
        if (node->val != rootVal) {
            return node->val;
        }
        int left = dfs(node->left);
        int right = dfs(node->right);
        if (left == -1) {
            return right;
        }
        if (right == -1) {
            return left;
        }
        return min(left, right);
    }
};
