#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool areSentencesSimilar(vector<string>& sentence1, vector<string>& sentence2, vector<vector<string>>& similarPairs) {
        if (sentence1.size() != sentence2.size()) {
            return false;
        }

        unordered_set<string> similar;
        for (auto& pair : similarPairs) {
            similar.insert(pair[0] + "#" + pair[1]);
            similar.insert(pair[1] + "#" + pair[0]);
        }

        for (size_t i = 0; i < sentence1.size(); i++) {
            const string& w1 = sentence1[i];
            const string& w2 = sentence2[i];
            if (w1 == w2) {
                continue;
            }
            if (similar.find(w1 + "#" + w2) == similar.end()) {
                return false;
            }
        }

        return true;
    }
};
