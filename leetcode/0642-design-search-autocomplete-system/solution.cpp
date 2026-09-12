#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class AutocompleteSystem {
public:
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        unordered_map<string, int> sentenceCounts;
    };

    TrieNode* root;
    unordered_map<string, int> freq;
    string currentPrefix;
    TrieNode* currentNode;
    bool fellOff;

    AutocompleteSystem(vector<string>& sentences, vector<int>& times) {
        root = new TrieNode();
        currentNode = root;
        fellOff = false;
        for (size_t i = 0; i < sentences.size(); i++) {
            freq[sentences[i]] = times[i];
            insert(sentences[i], times[i]);
        }
    }

    void insert(const string& sentence, int count) {
        TrieNode* node = root;
        for (char ch : sentence) {
            if (!node->children.count(ch)) {
                node->children[ch] = new TrieNode();
            }
            node = node->children[ch];
            node->sentenceCounts[sentence] = count;
        }
    }

    vector<string> input(char c) {
        if (c == '#') {
            string sentence = currentPrefix;
            freq[sentence] = freq.count(sentence) ? freq[sentence] + 1 : 1;
            insert(sentence, freq[sentence]);
            currentPrefix.clear();
            currentNode = root;
            fellOff = false;
            return {};
        }

        currentPrefix += c;
        if (fellOff) {
            return {};
        }

        if (!currentNode->children.count(c)) {
            fellOff = true;
            return {};
        }

        currentNode = currentNode->children[c];
        vector<pair<string, int>> candidates(currentNode->sentenceCounts.begin(), currentNode->sentenceCounts.end());
        sort(candidates.begin(), candidates.end(), [](const pair<string, int>& a, const pair<string, int>& b) {
            if (a.second != b.second) {
                return a.second > b.second;
            }
            return a.first < b.first;
        });

        vector<string> result;
        for (size_t i = 0; i < candidates.size() && i < 3; i++) {
            result.push_back(candidates[i].first);
        }
        return result;
    }
};
