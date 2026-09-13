#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int numWays(string s) {
        const long long MOD = 1000000007;
        int n = (int)s.size();
        int totalOnes = 0;
        for (char c : s) {
            if (c == '1') {
                totalOnes++;
            }
        }

        if (totalOnes % 3 != 0) {
            return 0;
        }

        if (totalOnes == 0) {
            long long ways = (long long)(n - 1) * (n - 2) / 2;
            return (int)(ways % MOD);
        }

        int each = totalOnes / 3;
        vector<int> onesIdx;
        onesIdx.reserve(totalOnes);
        for (int i = 0; i < n; i++) {
            if (s[i] == '1') {
                onesIdx.push_back(i);
            }
        }

        long long firstCutChoices = onesIdx[each] - onesIdx[each - 1];
        long long secondCutChoices = onesIdx[2 * each] - onesIdx[2 * each - 1];

        return (int)((firstCutChoices * secondCutChoices) % MOD);
    }
};
