#include <vector>
#include <algorithm>
#include <tuple>
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
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        vector<tuple<int, int, int>> triples; // (col, row, val)
        dfs(root, 0, 0, triples);

        sort(triples.begin(), triples.end());

        vector<vector<int>> result;
        bool haveCol = false;
        int currentCol = 0;
        for (auto& [col, row, val] : triples) {
            if (!haveCol || col != currentCol) {
                result.push_back({});
                currentCol = col;
                haveCol = true;
            }
            result.back().push_back(val);
        }

        return result;
    }

private:
    void dfs(TreeNode* node, int row, int col, vector<tuple<int, int, int>>& triples) {
        if (node == nullptr) {
            return;
        }
        triples.push_back({col, row, node->val});
        dfs(node->left, row + 1, col - 1, triples);
        dfs(node->right, row + 1, col + 1, triples);
    }
};
