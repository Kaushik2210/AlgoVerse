#include <unordered_map>
#include <vector>
using namespace std;

class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() { val = 0; }
    Node(int _val) { val = _val; }
    Node(int _val, vector<Node*> _neighbors) { val = _val; neighbors = _neighbors; }
};

class Solution {
public:
    unordered_map<Node*, Node*> cloned;

    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;

        auto it = cloned.find(node);
        if (it != cloned.end()) return it->second;

        Node* copy = new Node(node->val);
        cloned[node] = copy;
        for (Node* neighbor : node->neighbors) {
            copy->neighbors.push_back(cloneGraph(neighbor));
        }

        return copy;
    }
};
