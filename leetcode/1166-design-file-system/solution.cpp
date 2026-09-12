#include <string>
#include <vector>
#include <unordered_map>
#include <sstream>
using namespace std;

class FileSystem {
public:
    struct TrieNode {
        unordered_map<string, TrieNode*> children;
        int value = -1;
        bool exists = false;
    };

    TrieNode* root;

    FileSystem() {
        root = new TrieNode();
        root->exists = true;
    }

    vector<string> split(const string& path) {
        vector<string> parts;
        stringstream ss(path);
        string part;
        while (getline(ss, part, '/')) {
            if (!part.empty()) {
                parts.push_back(part);
            }
        }
        return parts;
    }

    bool createPath(string path, int value) {
        vector<string> parts = split(path);
        if (parts.empty()) {
            return false;
        }

        TrieNode* node = root;
        for (size_t i = 0; i + 1 < parts.size(); i++) {
            auto it = node->children.find(parts[i]);
            if (it == node->children.end() || !it->second->exists) {
                return false;
            }
            node = it->second;
        }

        const string& last = parts.back();
        auto it = node->children.find(last);
        if (it != node->children.end() && it->second->exists) {
            return false;
        }

        if (it == node->children.end()) {
            node->children[last] = new TrieNode();
        }
        TrieNode* child = node->children[last];
        child->exists = true;
        child->value = value;
        return true;
    }

    int get(string path) {
        vector<string> parts = split(path);
        TrieNode* node = root;
        for (const string& part : parts) {
            auto it = node->children.find(part);
            if (it == node->children.end() || !it->second->exists) {
                return -1;
            }
            node = it->second;
        }
        return node->value;
    }
};
