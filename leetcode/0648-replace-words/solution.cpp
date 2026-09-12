#include <vector>
#include <string>
#include <sstream>
#include <unordered_map>
using namespace std;

class Solution {
public:
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        bool isEnd = false;
    };

    TrieNode* root = new TrieNode();

    string replaceWords(vector<string>& dictionary, string sentence) {
        for (const string& word : dictionary) {
            TrieNode* node = root;
            for (char ch : word) {
                if (!node->children.count(ch)) {
                    node->children[ch] = new TrieNode();
                }
                node = node->children[ch];
            }
            node->isEnd = true;
        }

        stringstream ss(sentence);
        string word;
        string result;
        while (ss >> word) {
            if (!result.empty()) {
                result += " ";
            }
            result += findRoot(word);
        }
        return result;
    }

private:
    string findRoot(const string& word) {
        TrieNode* node = root;
        for (size_t i = 0; i < word.size(); i++) {
            char ch = word[i];
            if (!node->children.count(ch)) {
                return word;
            }
            node = node->children[ch];
            if (node->isEnd) {
                return word.substr(0, i + 1);
            }
        }
        return word;
    }
};
