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
public:
    void flatten(TreeNode* root) {
        TreeNode* node = root;

        while (node) {
            if (node->left) {
                // find the rightmost node of the left subtree
                TreeNode* rightmost = node->left;
                while (rightmost->right) {
                    rightmost = rightmost->right;
                }

                // graft the original right subtree onto that rightmost node
                rightmost->right = node->right;

                // the left subtree becomes the new right subtree, left is cleared
                node->right = node->left;
                node->left = nullptr;
            }

            node = node->right;
        }
    }
};
