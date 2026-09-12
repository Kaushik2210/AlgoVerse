#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

struct TrieNode {
    unordered_map<char, TrieNode*> children;
    string word = "";
};

class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (auto& word : words) {
            TrieNode* node = root;
            for (char c : word) {
                if (!node->children.count(c)) node->children[c] = new TrieNode();
                node = node->children[c];
            }
            node->word = word;
        }

        rows = board.size();
        cols = board[0].size();
        this->board = &board;

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                dfs(r, c, root);
            }
        }

        return result;
    }

private:
    int rows, cols;
    vector<vector<char>>* board;
    vector<string> result;

    void dfs(int r, int c, TrieNode* node) {
        char ch = (*board)[r][c];
        auto it = node->children.find(ch);
        if (it == node->children.end()) return;

        TrieNode* child = it->second;
        if (!child->word.empty()) {
            result.push_back(child->word);
            child->word = "";
        }

        (*board)[r][c] = '#';
        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};
        for (int d = 0; d < 4; d++) {
            int nr = r + dr[d], nc = c + dc[d];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && (*board)[nr][nc] != '#') {
                dfs(nr, nc, child);
            }
        }
        (*board)[r][c] = ch;

        if (child->children.empty() && child->word.empty()) {
            node->children.erase(ch);
        }
    }
};
