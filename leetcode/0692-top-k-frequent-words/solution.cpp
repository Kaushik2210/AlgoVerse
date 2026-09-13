#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<string> topKFrequent(vector<string>& words, int k) {
        unordered_map<string, int> counts;
        for (auto& w : words) counts[w]++;

        vector<string> unique;
        for (auto& [word, count] : counts) unique.push_back(word);

        sort(unique.begin(), unique.end(), [&](const string& a, const string& b) {
            if (counts[a] != counts[b]) return counts[a] > counts[b];
            return a < b;
        });

        unique.resize(k);
        return unique;
    }
};
