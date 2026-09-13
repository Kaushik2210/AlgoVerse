#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int numMatchingSubseq(string s, vector<string>& words) {
        vector<vector<pair<int, int>>> waiting(26); // (word index in words, char index)

        for (int w = 0; w < (int)words.size(); w++) {
            waiting[words[w][0] - 'a'].push_back({w, 0});
        }

        int count = 0;
        for (char ch : s) {
            int c = ch - 'a';
            vector<pair<int, int>> bucket;
            bucket.swap(waiting[c]);
            for (auto& [w, i] : bucket) {
                int ni = i + 1;
                if (ni == (int)words[w].size()) {
                    count++;
                } else {
                    waiting[words[w][ni] - 'a'].push_back({w, ni});
                }
            }
        }

        return count;
    }
};
