#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;

        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*' && j >= 2) {
                dp[0][j] = dp[0][j - 2];
            }
        }

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char pc = p[j - 1];
                if (pc == '*') {
                    bool zeroOccurrence = dp[i][j - 2];
                    bool oneOrMore = false;
                    char prev = p[j - 2];
                    if (prev == '.' || prev == s[i - 1]) {
                        oneOrMore = dp[i - 1][j];
                    }
                    dp[i][j] = zeroOccurrence || oneOrMore;
                } else if (pc == '.' || pc == s[i - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = false;
                }
            }
        }

        return dp[m][n];
    }
};
