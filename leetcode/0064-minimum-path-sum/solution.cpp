#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int rows = (int)grid.size(), cols = (int)grid[0].size();
        vector<int> row(cols);

        row[0] = grid[0][0];
        for (int j = 1; j < cols; j++) {
            row[j] = row[j - 1] + grid[0][j];
        }

        for (int i = 1; i < rows; i++) {
            row[0] += grid[i][0];
            for (int j = 1; j < cols; j++) {
                row[j] = grid[i][j] + min(row[j], row[j - 1]);
            }
        }

        return row[cols - 1];
    }
};
