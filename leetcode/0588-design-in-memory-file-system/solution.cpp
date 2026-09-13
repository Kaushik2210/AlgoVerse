#include <map>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

class FileSystem {
    struct Node {
        map<string, Node*> children; // std::map keeps keys sorted, so listing is free
        bool isFile = false;
        string content;
    };

    Node* root;

    vector<string> split(const string& path) {
        vector<string> parts;
        stringstream ss(path);
        string token;
        while (getline(ss, token, '/')) {
            if (!token.empty()) parts.push_back(token);
        }
        return parts;
    }

    Node* walk(const vector<string>& parts, bool createDirs) {
        Node* node = root;
        for (const string& p : parts) {
            if (node->children.find(p) == node->children.end()) {
                if (createDirs) {
                    node->children[p] = new Node();
                } else {
                    return nullptr;
                }
            }
            node = node->children[p];
        }
        return node;
    }

public:
    FileSystem() {
        root = new Node();
    }

    vector<string> ls(string path) {
        vector<string> parts = split(path);
        Node* node = walk(parts, false);
        if (node->isFile) {
            return {parts.back()};
        }
        vector<string> result;
        for (auto& [name, child] : node->children) {
            result.push_back(name);
        }
        return result;
    }

    void mkdir(string path) {
        walk(split(path), true);
    }

    void addContentToFile(string filePath, string content) {
        Node* node = walk(split(filePath), true);
        node->isFile = true;
        node->content += content;
    }

    string readContentFromFile(string filePath) {
        Node* node = walk(split(filePath), false);
        return node->content;
    }
};

/**
 * Your FileSystem object will be instantiated and called as such:
 * FileSystem* obj = new FileSystem();
 * vector<string> param_1 = obj->ls(path);
 * obj->mkdir(path);
 * obj->addContentToFile(filePath,content);
 * string param_4 = obj->readContentFromFile(filePath);
 */
