#include <string>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

class Solution {
public:
    string frequencySort(string s) {
        unordered_map<char, int> counts;
        for (char c : s) counts[c]++;

        vector<pair<char, int>> items(counts.begin(), counts.end());
        sort(items.begin(), items.end(), [](const auto& a, const auto& b) {
            return a.second > b.second;
        });

        string result;
        result.reserve(s.size());
        for (auto& [c, count] : items) {
            result.append(count, c);
        }
        return result;
    }
};
