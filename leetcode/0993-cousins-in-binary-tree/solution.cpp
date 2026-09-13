#include <queue>
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
    bool isCousins(TreeNode* root, int x, int y) {
        queue<pair<TreeNode*, TreeNode*>> q;
        q.push({root, nullptr});

        while (!q.empty()) {
            int levelSize = (int)q.size();
            TreeNode* parentX = nullptr;
            TreeNode* parentY = nullptr;
            bool foundX = false, foundY = false;

            for (int i = 0; i < levelSize; i++) {
                auto [node, parent] = q.front();
                q.pop();

                if (node->val == x) {
                    foundX = true;
                    parentX = parent;
                }
                if (node->val == y) {
                    foundY = true;
                    parentY = parent;
                }

                if (node->left) q.push({node->left, node});
                if (node->right) q.push({node->right, node});
            }

            if (foundX && foundY) {
                return parentX != parentY;
            }
            if (foundX || foundY) {
                return false;
            }
        }

        return false;
    }
};
