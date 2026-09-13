#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    string shortestPalindrome(string s) {
        if (s.empty()) return s;

        string reversed(s.rbegin(), s.rend());
        string combined = s + "#" + reversed;
        int n = (int)combined.size();
        vector<int> fail(n, 0);

        for (int i = 1; i < n; i++) {
            int length = fail[i - 1];
            while (length > 0 && combined[i] != combined[length]) {
                length = fail[length - 1];
            }
            if (combined[i] == combined[length]) {
                length++;
            }
            fail[i] = length;
        }

        int longestPalindromePrefix = fail[n - 1];
        string suffix = s.substr(longestPalindromePrefix);
        reverse(suffix.begin(), suffix.end());
        return suffix + s;
    }
};
