#include <string>
#include <vector>
#include <sstream>
#include <climits>
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

class Codec {
public:
    string serialize(TreeNode* root) {
        string result;
        preorder(root, result);
        if (!result.empty()) {
            result.pop_back(); // drop trailing comma
        }
        return result;
    }

    TreeNode* deserialize(string data) {
        if (data.empty()) {
            return nullptr;
        }

        values.clear();
        stringstream ss(data);
        string token;
        while (getline(ss, token, ',')) {
            values.push_back(stoi(token));
        }
        index = 0;

        return build(LLONG_MIN, LLONG_MAX);
    }

private:
    vector<int> values;
    size_t index = 0;

    void preorder(TreeNode* node, string& result) {
        if (node == nullptr) {
            return;
        }
        result += to_string(node->val) + ",";
        preorder(node->left, result);
        preorder(node->right, result);
    }

    TreeNode* build(long long lower, long long upper) {
        if (index == values.size() || !(lower < values[index] && values[index] < upper)) {
            return nullptr;
        }

        int val = values[index];
        index++;
        TreeNode* node = new TreeNode(val);
        node->left = build(lower, val);
        node->right = build(val, upper);
        return node;
    }
};

/**
 * Your Codec object will be instantiated and called as such:
 * Codec* ser = new Codec();
 * Codec* deser = new Codec();
 * TreeNode* tree = deser->deserialize(ser->serialize(root));
 */
