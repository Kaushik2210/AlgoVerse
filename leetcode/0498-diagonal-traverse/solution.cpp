#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& mat) {
        int m = (int)mat.size(), n = (int)mat[0].size();
        vector<int> result;
        result.reserve(m * n);

        for (int d = 0; d < m + n - 1; d++) {
            int rLo = max(0, d - (n - 1));
            int rHi = min(d, m - 1);

            if (d % 2 == 0) {
                for (int r = rHi; r >= rLo; r--) {
                    result.push_back(mat[r][d - r]);
                }
            } else {
                for (int r = rLo; r <= rHi; r++) {
                    result.push_back(mat[r][d - r]);
                }
            }
        }

        return result;
    }
};
