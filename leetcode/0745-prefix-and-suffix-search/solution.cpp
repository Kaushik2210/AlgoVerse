#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

class WordFilter {
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        int maxIndex = -1;
    };

    TrieNode* root;

public:
    WordFilter(vector<string>& words) {
        root = new TrieNode();
        for (int index = 0; index < (int)words.size(); index++) {
            const string& word = words[index];
            for (int k = 0; k <= (int)word.size(); k++) {
                string combo = word.substr(k) + "#" + word;
                TrieNode* node = root;
                node->maxIndex = index;
                for (char ch : combo) {
                    if (node->children.find(ch) == node->children.end()) {
                        node->children[ch] = new TrieNode();
                    }
                    node = node->children[ch];
                    node->maxIndex = index;
                }
            }
        }
    }

    int f(string prefix, string suffix) {
        string combo = suffix + "#" + prefix;
        TrieNode* node = root;
        for (char ch : combo) {
            auto it = node->children.find(ch);
            if (it == node->children.end()) return -1;
            node = it->second;
        }
        return node->maxIndex;
    }
};
