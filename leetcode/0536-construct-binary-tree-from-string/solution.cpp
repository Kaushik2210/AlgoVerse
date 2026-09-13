#include <string>
#include <cctype>
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
    TreeNode* str2tree(string s) {
        if (s.empty()) {
            return nullptr;
        }
        str = s;
        i = 0;
        return parseNode();
    }

private:
    string str;
    int i;

    int parseInt() {
        int start = i;
        if (str[i] == '-') {
            i++;
        }
        while (i < (int)str.size() && isdigit(str[i])) {
            i++;
        }
        return stoi(str.substr(start, i - start));
    }

    TreeNode* parseNode() {
        int val = parseInt();
        TreeNode* node = new TreeNode(val);

        if (i < (int)str.size() && str[i] == '(') {
            i++; // consume '('
            node->left = parseNode();
            i++; // consume ')'
        }

        if (i < (int)str.size() && str[i] == '(') {
            i++; // consume '('
            node->right = parseNode();
            i++; // consume ')'
        }

        return node;
    }
};
