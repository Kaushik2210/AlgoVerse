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
    TreeNode* increasingBST(TreeNode* root) {
        TreeNode dummy;
        prev = &dummy;
        inorder(root);
        return dummy.right;
    }

private:
    TreeNode* prev;

    void inorder(TreeNode* node) {
        if (node == nullptr) {
            return;
        }
        inorder(node->left);
        node->left = nullptr;
        prev->right = node;
        prev = node;
        inorder(node->right);
    }
};
