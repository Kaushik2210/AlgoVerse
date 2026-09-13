#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> matrixReshape(vector<vector<int>>& mat, int r, int c) {
        int m = (int)mat.size(), n = (int)mat[0].size();
        if (r * c != m * n) {
            return mat;
        }

        vector<vector<int>> result(r, vector<int>(c, 0));
        for (int k = 0; k < m * n; k++) {
            result[k / c][k % c] = mat[k / n][k % n];
        }

        return result;
    }
};
