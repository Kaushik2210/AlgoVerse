#include <stack>
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

class BSTIterator {
public:
    BSTIterator(TreeNode* root) {
        pushLeftSpine(root);
    }

    int next() {
        TreeNode* node = stk.top();
        stk.pop();
        pushLeftSpine(node->right);
        return node->val;
    }

    bool hasNext() {
        return !stk.empty();
    }

private:
    stack<TreeNode*> stk;

    void pushLeftSpine(TreeNode* node) {
        while (node != nullptr) {
            stk.push(node);
            node = node->left;
        }
    }
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator* obj = new BSTIterator(root);
 * int param_1 = obj->next();
 * bool param_2 = obj->hasNext();
 */
