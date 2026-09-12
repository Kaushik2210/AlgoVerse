#include <string>
#include <unordered_map>
using namespace std;

class MapSum {
public:
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        int sum = 0;
    };

    TrieNode* root;
    unordered_map<string, int> keyValues;

    MapSum() {
        root = new TrieNode();
    }

    void insert(string key, int val) {
        int delta = val - (keyValues.count(key) ? keyValues[key] : 0);
        keyValues[key] = val;

        TrieNode* node = root;
        node->sum += delta;
        for (char ch : key) {
            if (!node->children.count(ch)) {
                node->children[ch] = new TrieNode();
            }
            node = node->children[ch];
            node->sum += delta;
        }
    }

    int sum(string prefix) {
        TrieNode* node = root;
        for (char ch : prefix) {
            if (!node->children.count(ch)) {
                return 0;
            }
            node = node->children[ch];
        }
        return node->sum;
    }
};
