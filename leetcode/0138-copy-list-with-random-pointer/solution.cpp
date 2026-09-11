#include <unordered_map>
using namespace std;

// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;

    Node(int _val) {
        val = _val;
        next = nullptr;
        random = nullptr;
    }
};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;

        unordered_map<Node*, Node*> clones;

        Node* node = head;
        while (node) {
            clones[node] = new Node(node->val);
            node = node->next;
        }

        node = head;
        while (node) {
            clones[node]->next = node->next ? clones[node->next] : nullptr;
            clones[node]->random = node->random ? clones[node->random] : nullptr;
            node = node->next;
        }

        return clones[head];
    }
};
