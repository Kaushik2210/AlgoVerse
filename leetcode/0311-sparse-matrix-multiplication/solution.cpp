#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> multiply(vector<vector<int>>& mat1, vector<vector<int>>& mat2) {
        int m = (int)mat1.size(), k = (int)mat1[0].size(), n = (int)mat2[0].size();
        vector<vector<int>> result(m, vector<int>(n, 0));

        for (int i = 0; i < m; i++) {
            for (int x = 0; x < k; x++) {
                int val1 = mat1[i][x];
                if (val1 == 0) continue;
                for (int j = 0; j < n; j++) {
                    int val2 = mat2[x][j];
                    if (val2 != 0) {
                        result[i][j] += val1 * val2;
                    }
                }
            }
        }

        return result;
    }
};
