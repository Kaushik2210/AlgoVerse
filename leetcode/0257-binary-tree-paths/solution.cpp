#include <string>
#include <vector>
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
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> paths;
        dfs(root, "", paths);
        return paths;
    }

private:
    void dfs(TreeNode* node, string path, vector<string>& paths) {
        if (!node) {
            return;
        }

        string current = path.empty() ? to_string(node->val) : path + "->" + to_string(node->val);

        if (!node->left && !node->right) {
            paths.push_back(current);
            return;
        }

        dfs(node->left, current, paths);
        dfs(node->right, current, paths);
    }
};
