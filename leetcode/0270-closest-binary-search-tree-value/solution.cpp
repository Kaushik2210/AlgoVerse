#include <cmath>
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
class Solution {
public:
    int closestValue(TreeNode* root, double target) {
        int closest = root->val;
        TreeNode* node = root;

        while (node) {
            if (abs(node->val - target) < abs(closest - target)) {
                closest = node->val;
            }
            node = target < node->val ? node->left : node->right;
        }

        return closest;
    }
};
