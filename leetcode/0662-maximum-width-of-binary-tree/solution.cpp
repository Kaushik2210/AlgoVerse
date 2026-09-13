#include <queue>
#include <utility>
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
    int widthOfBinaryTree(TreeNode* root) {
        if (root == nullptr) {
            return 0;
        }

        int maxWidth = 0;
        queue<pair<TreeNode*, long long>> q;
        q.push({root, 0});

        while (!q.empty()) {
            int levelSize = (int)q.size();
            long long firstIndex = q.front().second;
            long long lastIndex = firstIndex;

            for (int i = 0; i < levelSize; i++) {
                auto [node, idx] = q.front();
                q.pop();
                long long index = idx - firstIndex;
                lastIndex = index;

                if (node->left) q.push({node->left, 2 * index});
                if (node->right) q.push({node->right, 2 * index + 1});
            }

            maxWidth = max(maxWidth, (int)(lastIndex + 1));
        }

        return maxWidth;
    }
};
