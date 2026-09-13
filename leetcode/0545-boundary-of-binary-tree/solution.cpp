#include <vector>
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
    vector<int> boundaryOfBinaryTree(TreeNode* root) {
        vector<int> result;
        if (root == nullptr) {
            return result;
        }

        if (!isLeaf(root)) {
            result.push_back(root->val);
        }

        TreeNode* node = root->left;
        while (node != nullptr) {
            if (!isLeaf(node)) {
                result.push_back(node->val);
            }
            node = node->left != nullptr ? node->left : node->right;
        }

        collectLeaves(root, result);

        vector<int> rightBoundary;
        node = root->right;
        while (node != nullptr) {
            if (!isLeaf(node)) {
                rightBoundary.push_back(node->val);
            }
            node = node->right != nullptr ? node->right : node->left;
        }
        reverse(rightBoundary.begin(), rightBoundary.end());
        result.insert(result.end(), rightBoundary.begin(), rightBoundary.end());

        return result;
    }

private:
    bool isLeaf(TreeNode* node) {
        return node->left == nullptr && node->right == nullptr;
    }

    void collectLeaves(TreeNode* node, vector<int>& result) {
        if (node == nullptr) {
            return;
        }
        if (isLeaf(node)) {
            result.push_back(node->val);
            return;
        }
        collectLeaves(node->left, result);
        collectLeaves(node->right, result);
    }
};
