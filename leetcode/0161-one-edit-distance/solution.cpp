#include <string>
#include <cmath>
using namespace std;

class Solution {
public:
    bool isOneEditDistance(string s, string t) {
        if (abs((int)s.size() - (int)t.size()) > 1) {
            return false;
        }

        if (s.size() == t.size()) {
            int differences = 0;
            for (size_t k = 0; k < s.size(); k++) {
                if (s[k] != t[k]) differences++;
            }
            return differences == 1;
        }

        string shorter = s.size() < t.size() ? s : t;
        string longer = s.size() < t.size() ? t : s;

        size_t i = 0, j = 0;
        bool foundDifference = false;
        while (i < shorter.size() && j < longer.size()) {
            if (shorter[i] == longer[j]) {
                i++;
                j++;
            } else {
                if (foundDifference) return false;
                foundDifference = true;
                j++;
            }
        }

        return true;
    }
};
