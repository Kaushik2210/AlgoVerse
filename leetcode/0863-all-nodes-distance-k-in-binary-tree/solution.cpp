#include <vector>
#include <queue>
#include <unordered_map>
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
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        unordered_map<TreeNode*, TreeNode*> parent;
        buildParents(root, nullptr, parent);

        unordered_set<TreeNode*> visited;
        queue<TreeNode*> q;
        visited.insert(target);
        q.push(target);
        int distance = 0;

        while (!q.empty() && distance < k) {
            int levelSize = (int)q.size();
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                TreeNode* neighbors[3] = {node->left, node->right, parent[node]};
                for (TreeNode* neighbor : neighbors) {
                    if (neighbor != nullptr && !visited.count(neighbor)) {
                        visited.insert(neighbor);
                        q.push(neighbor);
                    }
                }
            }
            distance++;
        }

        vector<int> result;
        while (!q.empty()) {
            result.push_back(q.front()->val);
            q.pop();
        }
        return result;
    }

private:
    void buildParents(TreeNode* node, TreeNode* par, unordered_map<TreeNode*, TreeNode*>& parent) {
        if (node == nullptr) {
            return;
        }
        parent[node] = par;
        buildParents(node->left, node, parent);
        buildParents(node->right, node, parent);
    }
};
