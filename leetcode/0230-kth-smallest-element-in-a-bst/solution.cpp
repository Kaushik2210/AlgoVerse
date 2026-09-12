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
private:
    int count = 0;
    int result = -1;

    void inorder(TreeNode* node, int k) {
        if (node == nullptr || count >= k) {
            return;
        }

        inorder(node->left, k);
        if (count >= k) {
            return;
        }
        count++;
        if (count == k) {
            result = node->val;
            return;
        }
        inorder(node->right, k);
    }

public:
    int kthSmallest(TreeNode* root, int k) {
        inorder(root, k);
        return result;
    }
};
