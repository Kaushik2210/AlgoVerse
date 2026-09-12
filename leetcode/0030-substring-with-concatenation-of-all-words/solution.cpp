#include <string>
#include <unordered_map>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        vector<int> result;
        if (s.empty() || words.empty()) {
            return result;
        }

        int wordLen = words[0].size();
        int numWords = words.size();
        int windowLen = wordLen * numWords;

        if (windowLen > (int)s.size()) {
            return result;
        }

        unordered_map<string, int> wordCount;
        for (const string& w : words) {
            wordCount[w]++;
        }

        for (int start = 0; start <= (int)s.size() - windowLen; start++) {
            unordered_map<string, int> seen;
            bool ok = true;

            for (int i = 0; i < numWords; i++) {
                int chunkStart = start + i * wordLen;
                string chunk = s.substr(chunkStart, wordLen);

                auto it = wordCount.find(chunk);
                if (it == wordCount.end()) {
                    ok = false;
                    break;
                }

                if (++seen[chunk] > it->second) {
                    ok = false;
                    break;
                }
            }

            if (ok) {
                result.push_back(start);
            }
        }

        return result;
    }
};
