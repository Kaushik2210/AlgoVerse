#include <vector>
#include <algorithm>
#include <climits>
using namespace std;

class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        vector<int> prev = matrix[0];

        for (int i = 1; i < n; i++) {
            vector<int> curr(n);
            for (int j = 0; j < n; j++) {
                int best = prev[j];
                if (j > 0) best = min(best, prev[j - 1]);
                if (j < n - 1) best = min(best, prev[j + 1]);
                curr[j] = matrix[i][j] + best;
            }
            prev = curr;
        }

        return *min_element(prev.begin(), prev.end());
    }
};
