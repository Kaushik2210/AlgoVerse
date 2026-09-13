#include <vector>
#include <string>
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
    vector<TreeNode*> findDuplicateSubtrees(TreeNode* root) {
        serialize(root);
        return result;
    }

private:
    unordered_map<string, int> counts;
    vector<TreeNode*> result;

    string serialize(TreeNode* node) {
        if (node == nullptr) {
            return "#";
        }

        string left = serialize(node->left);
        string right = serialize(node->right);
        string key = to_string(node->val) + "," + left + "," + right;

        int count = ++counts[key];
        if (count == 2) {
            result.push_back(node);
        }

        return key;
    }
};
