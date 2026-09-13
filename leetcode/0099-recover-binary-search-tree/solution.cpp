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

class Solution {
public:
    void recoverTree(TreeNode* root) {
        TreeNode* first = nullptr;
        TreeNode* second = nullptr;
        TreeNode* prev = nullptr;
        stack<TreeNode*> stk;
        TreeNode* node = root;

        while (!stk.empty() || node != nullptr) {
            while (node != nullptr) {
                stk.push(node);
                node = node->left;
            }

            node = stk.top();
            stk.pop();

            if (prev != nullptr && prev->val > node->val) {
                if (first == nullptr) {
                    first = prev;
                }
                second = node;
            }
            prev = node;

            node = node->right;
        }

        if (first != nullptr && second != nullptr) {
            int tmp = first->val;
            first->val = second->val;
            second->val = tmp;
        }
    }
};
