#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int firstUniqChar(string s) {
        vector<int> counts(26, 0);
        for (char ch : s) {
            counts[ch - 'a']++;
        }

        for (int i = 0; i < (int)s.size(); i++) {
            if (counts[s[i] - 'a'] == 1) {
                return i;
            }
        }

        return -1;
    }
};
