#include <string>
#include <unordered_map>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};

class WordDictionary {
public:
    WordDictionary() {
        root = new TrieNode();
    }

    void addWord(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        return dfs(root, word, 0);
    }

private:
    TrieNode* root;

    bool dfs(TrieNode* node, const string& word, int i) {
        if (i == (int)word.size()) return node->isEnd;

        char c = word[i];
        if (c == '.') {
            for (auto& [ch, child] : node->children) {
                if (dfs(child, word, i + 1)) return true;
            }
            return false;
        }

        auto it = node->children.find(c);
        return it != node->children.end() && dfs(it->second, word, i + 1);
    }
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary* obj = new WordDictionary();
 * obj->addWord(word);
 * bool param_2 = obj->search(word);
 */
