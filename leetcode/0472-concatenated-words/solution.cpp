#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {
        unordered_set<string> wordSet(words.begin(), words.end());

        vector<string> result;
        for (const string& w : words) {
            if (w.empty()) continue;
            if (canBuild(w, wordSet)) result.push_back(w);
        }
        return result;
    }

private:
    bool canBuild(const string& word, unordered_set<string>& wordSet) {
        int n = (int)word.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (!dp[j]) continue;
                string piece = word.substr(j, i - j);
                if (piece == word) continue;
                if (wordSet.find(piece) != wordSet.end()) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
};
