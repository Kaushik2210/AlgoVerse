#include <string>
using namespace std;

class Solution {
public:
    string customSortString(string order, string s) {
        int counts[26] = {0};
        for (char c : s) counts[c - 'a']++;

        string result;
        result.reserve(s.size());

        for (char c : order) {
            int idx = c - 'a';
            result.append(counts[idx], c);
            counts[idx] = 0;
        }

        for (int i = 0; i < 26; i++) {
            if (counts[i] > 0) {
                result.append(counts[i], (char)('a' + i));
            }
        }

        return result;
    }
};
