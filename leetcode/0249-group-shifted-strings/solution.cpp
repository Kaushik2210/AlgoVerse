#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupStrings(vector<string>& strings) {
        unordered_map<string, vector<string>> groups;
        for (const string& s : strings) {
            string key;
            for (size_t i = 0; i < s.size(); i++) {
                int diff = (s[i] - s[0] + 26) % 26;
                key += to_string(diff) + ",";
            }
            groups[key].push_back(s);
        }
        vector<vector<string>> result;
        for (auto& [k, v] : groups) {
            result.push_back(v);
        }
        return result;
    }
};
