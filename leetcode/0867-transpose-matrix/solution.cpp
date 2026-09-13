#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> transpose(vector<vector<int>>& matrix) {
        int rows = (int)matrix.size(), cols = (int)matrix[0].size();
        vector<vector<int>> result(cols, vector<int>(rows, 0));

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                result[c][r] = matrix[r][c];
            }
        }

        return result;
    }
};
