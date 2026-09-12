// Definition for a Node.
class Node {
public:
    int val;
    Node* left;
    Node* right;

    Node() {}

    Node(int _val) {
        val = _val;
        left = NULL;
        right = NULL;
    }

    Node(int _val, Node* _left, Node* _right) {
        val = _val;
        left = _left;
        right = _right;
    }
};

class Solution {
private:
    Node* first = nullptr;
    Node* last = nullptr;

    void inorder(Node* node) {
        if (!node) return;
        inorder(node->left);

        if (last) {
            last->right = node;
            node->left = last;
        } else {
            first = node;
        }
        last = node;

        inorder(node->right);
    }

public:
    Node* treeToDoublyList(Node* root) {
        if (!root) return nullptr;

        first = nullptr;
        last = nullptr;
        inorder(root);

        last->right = first;
        first->left = last;

        return first;
    }
};
