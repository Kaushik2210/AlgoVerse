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
    int pathSum(TreeNode* root, int targetSum) {
        unordered_map<long long, int> prefixCounts;
        prefixCounts[0] = 1;
        int count = 0;
        dfs(root, 0LL, targetSum, prefixCounts, count);
        return count;
    }

private:
    void dfs(TreeNode* node, long long runningSum, int targetSum,
             unordered_map<long long, int>& prefixCounts, int& count) {
        if (node == nullptr) {
            return;
        }
        runningSum += node->val;
        auto it = prefixCounts.find(runningSum - targetSum);
        if (it != prefixCounts.end()) {
            count += it->second;
        }
        prefixCounts[runningSum]++;
        dfs(node->left, runningSum, targetSum, prefixCounts, count);
        dfs(node->right, runningSum, targetSum, prefixCounts, count);
        prefixCounts[runningSum]--;
    }
};
