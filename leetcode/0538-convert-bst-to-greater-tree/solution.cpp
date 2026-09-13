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
    TreeNode* convertBST(TreeNode* root) {
        reverseInorder(root);
        return root;
    }

private:
    int runningSum = 0;

    void reverseInorder(TreeNode* node) {
        if (node == nullptr) {
            return;
        }
        reverseInorder(node->right);
        runningSum += node->val;
        node->val = runningSum;
        reverseInorder(node->left);
    }
};
