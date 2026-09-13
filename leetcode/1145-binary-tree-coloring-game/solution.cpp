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
    bool btreeGameWinningMove(TreeNode* root, int n, int x) {
        leftSize = rightSize = 0;
        count(root, x);
        int parentSize = n - leftSize - rightSize - 1;
        return max({leftSize, rightSize, parentSize}) > n / 2;
    }

private:
    int leftSize, rightSize;

    int count(TreeNode* node, int x) {
        if (node == nullptr) return 0;
        int left = count(node->left, x);
        int right = count(node->right, x);
        if (node->val == x) {
            leftSize = left;
            rightSize = right;
        }
        return left + right + 1;
    }
};
