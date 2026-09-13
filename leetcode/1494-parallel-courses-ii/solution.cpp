#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int minNumberOfSemesters(int n, vector<vector<int>>& relations, int k) {
        vector<int> prereq(n, 0);
        for (auto& rel : relations) {
            prereq[rel[1] - 1] |= 1 << (rel[0] - 1);
        }

        int full = (1 << n) - 1;
        vector<int> dp(1 << n, INT_MAX);
        dp[0] = 0;

        for (int mask = 0; mask <= full; mask++) {
            if (dp[mask] == INT_MAX) continue;

            int available = 0;
            for (int c = 0; c < n; c++) {
                if (mask & (1 << c)) continue;
                if ((prereq[c] & mask) == prereq[c]) {
                    available |= 1 << c;
                }
            }

            if (available == 0) continue;

            for (int sub = available; sub > 0; sub = (sub - 1) & available) {
                if (__builtin_popcount(sub) <= k) {
                    int newMask = mask | sub;
                    if (dp[mask] + 1 < dp[newMask]) {
                        dp[newMask] = dp[mask] + 1;
                    }
                }
            }
        }

        return dp[full];
    }
};
