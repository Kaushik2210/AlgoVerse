#include <string>
#include <array>
using namespace std;

class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        int n1 = s1.size(), n2 = s2.size();
        if (n1 > n2) {
            return false;
        }

        array<int, 26> need{}, window{};

        for (int i = 0; i < n1; i++) {
            need[s1[i] - 'a']++;
            window[s2[i] - 'a']++;
        }

        if (need == window) {
            return true;
        }

        for (int i = n1; i < n2; i++) {
            window[s2[i] - 'a']++;
            window[s2[i - n1] - 'a']--;
            if (need == window) {
                return true;
            }
        }

        return false;
    }
};
