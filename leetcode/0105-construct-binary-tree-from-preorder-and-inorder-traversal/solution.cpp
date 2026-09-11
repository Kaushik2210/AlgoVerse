#include <vector>
#include <unordered_map>
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
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        this->preorder = &preorder;
        for (int i = 0; i < (int)inorder.size(); i++) {
            inorderIndex[inorder[i]] = i;
        }
        prePos = 0;

        return build(0, (int)inorder.size() - 1);
    }

private:
    vector<int>* preorder;
    unordered_map<int, int> inorderIndex;
    int prePos;

    TreeNode* build(int left, int right) {
        if (left > right) {
            return nullptr;
        }

        int rootVal = (*preorder)[prePos++];
        TreeNode* root = new TreeNode(rootVal);

        int mid = inorderIndex[rootVal];
        root->left = build(left, mid - 1);
        root->right = build(mid + 1, right);

        return root;
    }
};
