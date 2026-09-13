#include <vector>
#include <unordered_map>
#include <algorithm>
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
    vector<int> findFrequentTreeSum(TreeNode* root) {
        unordered_map<int, int> counts;
        dfs(root, counts);
        if (counts.empty()) {
            return {};
        }
        int maxFreq = 0;
        for (auto& [sum, freq] : counts) {
            maxFreq = max(maxFreq, freq);
        }
        vector<int> result;
        for (auto& [sum, freq] : counts) {
            if (freq == maxFreq) {
                result.push_back(sum);
            }
        }
        return result;
    }

private:
    int dfs(TreeNode* node, unordered_map<int, int>& counts) {
        if (node == nullptr) {
            return 0;
        }
        int total = node->val + dfs(node->left, counts) + dfs(node->right, counts);
        counts[total]++;
        return total;
    }
};
