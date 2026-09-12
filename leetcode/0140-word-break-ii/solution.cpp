#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
using namespace std;

class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        words = unordered_set<string>(wordDict.begin(), wordDict.end());
        this->s = s;
        return breakFrom(0);
    }

private:
    string s;
    unordered_set<string> words;
    unordered_map<int, vector<string>> memo;

    vector<string> breakFrom(int i) {
        auto cached = memo.find(i);
        if (cached != memo.end()) {
            return cached->second;
        }

        vector<string> sentences;
        int n = s.size();
        if (i == n) {
            sentences.push_back("");
            memo[i] = sentences;
            return sentences;
        }

        for (int j = i + 1; j <= n; j++) {
            string word = s.substr(i, j - i);
            if (words.count(word)) {
                for (const string& rest : breakFrom(j)) {
                    sentences.push_back(rest.empty() ? word : word + " " + rest);
                }
            }
        }

        memo[i] = sentences;
        return sentences;
    }
};
