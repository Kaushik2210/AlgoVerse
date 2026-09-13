#include <vector>
#include <unordered_set>
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
    vector<TreeNode*> delNodes(TreeNode* root, vector<int>& to_delete) {
        unordered_set<int> toDeleteSet(to_delete.begin(), to_delete.end());
        vector<TreeNode*> result;
        dfs(root, true, toDeleteSet, result);
        return result;
    }

private:
    TreeNode* dfs(TreeNode* node, bool isRoot, unordered_set<int>& toDelete, vector<TreeNode*>& result) {
        if (node == nullptr) return nullptr;

        bool deleted = toDelete.count(node->val) > 0;
        if (isRoot && !deleted) {
            result.push_back(node);
        }

        node->left = dfs(node->left, deleted, toDelete, result);
        node->right = dfs(node->right, deleted, toDelete, result);

        return deleted ? nullptr : node;
    }
};
