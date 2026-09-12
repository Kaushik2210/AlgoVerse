#include <string>
#include <vector>
#include <unordered_set>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        vector<vector<string>> results;
        if (!wordSet.count(endWord)) {
            return results;
        }

        unordered_map<string, unordered_set<string>> parents;
        unordered_set<string> currentLayer{beginWord};
        wordSet.erase(beginWord);
        bool found = false;

        while (!currentLayer.empty() && !found) {
            unordered_map<string, unordered_set<string>> nextLayer;

            for (const string& word : currentLayer) {
                string candidate = word;
                for (int i = 0; i < (int)word.size(); i++) {
                    char original = candidate[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        if (c == original) continue;
                        candidate[i] = c;
                        if (wordSet.count(candidate)) {
                            nextLayer[candidate].insert(word);
                        }
                    }
                    candidate[i] = original;
                }
            }

            for (auto& [word, _] : nextLayer) {
                wordSet.erase(word);
                for (const string& p : nextLayer[word]) {
                    parents[word].insert(p);
                }
                if (word == endWord) {
                    found = true;
                }
            }

            unordered_set<string> next;
            for (auto& [word, _] : nextLayer) {
                next.insert(word);
            }
            currentLayer = next;
        }

        if (!found) {
            return results;
        }

        vector<string> path{endWord};
        backtrack(endWord, beginWord, parents, path, results);
        return results;
    }

private:
    void backtrack(const string& word, const string& beginWord,
                    unordered_map<string, unordered_set<string>>& parents,
                    vector<string>& path, vector<vector<string>>& results) {
        if (word == beginWord) {
            vector<string> full(path.rbegin(), path.rend());
            results.push_back(full);
            return;
        }
        if (!parents.count(word)) return;
        for (const string& parent : parents[word]) {
            path.push_back(parent);
            backtrack(parent, beginWord, parents, path, results);
            path.pop_back();
        }
    }
};
