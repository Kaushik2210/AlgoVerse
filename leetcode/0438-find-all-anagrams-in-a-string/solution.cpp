#include <string>
#include <vector>
#include <array>
using namespace std;

class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int n1 = p.size(), n2 = s.size();
        vector<int> result;
        if (n1 > n2) {
            return result;
        }

        array<int, 26> need{}, window{};

        for (int i = 0; i < n1; i++) {
            need[p[i] - 'a']++;
            window[s[i] - 'a']++;
        }

        if (need == window) {
            result.push_back(0);
        }

        for (int i = n1; i < n2; i++) {
            window[s[i] - 'a']++;
            window[s[i - n1] - 'a']--;
            if (need == window) {
                result.push_back(i - n1 + 1);
            }
        }

        return result;
    }
};
