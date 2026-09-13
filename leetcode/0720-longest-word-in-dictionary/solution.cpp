#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    string longestWord(vector<string>& words) {
        unordered_set<string> wordSet(words.begin(), words.end());

        string best = "";
        for (const string& word : words) {
            bool buildable = true;
            for (size_t i = 1; i <= word.size(); i++) {
                if (wordSet.find(word.substr(0, i)) == wordSet.end()) {
                    buildable = false;
                    break;
                }
            }
            if (buildable) {
                if (word.size() > best.size() || (word.size() == best.size() && word < best)) {
                    best = word;
                }
            }
        }
        return best;
    }
};
