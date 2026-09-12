#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) {
            return "";
        }

        string prefix = strs[0];
        for (int i = 1; i < (int)strs.size(); i++) {
            while (strs[i].compare(0, prefix.size(), prefix) != 0) {
                prefix.pop_back();
                if (prefix.empty()) {
                    return "";
                }
            }
        }

        return prefix;
    }
};
