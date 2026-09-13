#include <algorithm>
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
    int diameterOfBinaryTree(TreeNode* root) {
        best = 0;
        depth(root);
        return best;
    }

private:
    int best;

    int depth(TreeNode* node) {
        if (node == nullptr) {
            return 0;
        }
        int left = depth(node->left);
        int right = depth(node->right);
        best = max(best, left + right);
        return 1 + max(left, right);
    }
};
