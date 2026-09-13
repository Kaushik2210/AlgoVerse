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
    TreeNode* addOneRow(TreeNode* root, int val, int depth) {
        if (depth == 1) {
            return new TreeNode(val, root, nullptr);
        }

        dfs(root, val, depth, 1);
        return root;
    }

private:
    void dfs(TreeNode* node, int val, int depth, int currentDepth) {
        if (node == nullptr) return;

        if (currentDepth == depth - 1) {
            node->left = new TreeNode(val, node->left, nullptr);
            node->right = new TreeNode(val, nullptr, node->right);
        } else {
            dfs(node->left, val, depth, currentDepth + 1);
            dfs(node->right, val, depth, currentDepth + 1);
        }
    }
};
