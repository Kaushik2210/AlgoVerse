#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    unordered_map<string, string> parent;

    string find(const string& word) {
        if (parent.find(word) == parent.end()) {
            parent[word] = word;
        }
        string w = word;
        while (parent[w] != w) {
            parent[w] = parent[parent[w]];
            w = parent[w];
        }
        return w;
    }

    void unite(const string& a, const string& b) {
        string ra = find(a);
        string rb = find(b);
        if (ra != rb) {
            parent[ra] = rb;
        }
    }

    bool areSentencesSimilarTwo(vector<string>& sentence1, vector<string>& sentence2, vector<vector<string>>& similarPairs) {
        if (sentence1.size() != sentence2.size()) {
            return false;
        }

        for (auto& pair : similarPairs) {
            unite(pair[0], pair[1]);
        }

        for (size_t i = 0; i < sentence1.size(); i++) {
            if (sentence1[i] == sentence2[i]) {
                continue;
            }
            if (find(sentence1[i]) != find(sentence2[i])) {
                return false;
            }
        }

        return true;
    }
};
