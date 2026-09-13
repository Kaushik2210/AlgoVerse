#include <climits>
#include <vector>
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
    TreeNode* bstFromPreorder(vector<int>& preorder) {
        i = 0;
        this->preorder = &preorder;
        return build(LONG_MAX);
    }

private:
    vector<int>* preorder;
    int i;

    TreeNode* build(long bound) {
        if (i == (int)preorder->size() || (*preorder)[i] > bound) {
            return nullptr;
        }
        TreeNode* node = new TreeNode((*preorder)[i]);
        i++;
        node->left = build(node->val);
        node->right = build(bound);
        return node;
    }
};
