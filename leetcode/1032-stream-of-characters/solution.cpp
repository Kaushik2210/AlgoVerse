#include <vector>
#include <string>
#include <deque>
#include <unordered_map>
using namespace std;

class StreamChecker {
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        bool isWord = false;
    };

    TrieNode* root;
    deque<char> stream;
    int maxLen = 0;

public:
    StreamChecker(vector<string>& words) {
        root = new TrieNode();
        for (const string& w : words) {
            maxLen = max(maxLen, (int)w.size());
            TrieNode* node = root;
            for (int i = (int)w.size() - 1; i >= 0; i--) {
                char ch = w[i];
                if (node->children.find(ch) == node->children.end()) {
                    node->children[ch] = new TrieNode();
                }
                node = node->children[ch];
            }
            node->isWord = true;
        }
    }

    bool query(char letter) {
        stream.push_back(letter);
        while ((int)stream.size() > maxLen) stream.pop_front();

        TrieNode* node = root;
        for (auto it = stream.rbegin(); it != stream.rend(); ++it) {
            auto found = node->children.find(*it);
            if (found == node->children.end()) return false;
            node = found->second;
            if (node->isWord) return true;
        }
        return false;
    }
};
