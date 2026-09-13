#include <string>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool hasAllCodes(string s, int k) {
        int need = 1 << k;
        if ((int)s.size() - k + 1 < need) {
            return false;
        }

        unordered_set<int> seen;
        int window = 0;
        int mask = need - 1;

        for (int i = 0; i < (int)s.size(); i++) {
            window = ((window << 1) | (s[i] - '0')) & mask;
            if (i >= k - 1) {
                seen.insert(window);
            }
        }

        return (int)seen.size() == need;
    }
};
