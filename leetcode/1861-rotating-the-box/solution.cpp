#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<char>> rotateTheBox(vector<vector<char>>& box) {
        int m = box.size(), n = box[0].size();
        vector<vector<char>> grid = box;

        for (auto& row : grid) {
            int write = n - 1;
            for (int col = n - 1; col >= 0; col--) {
                if (row[col] == '*') {
                    write = col - 1;
                } else if (row[col] == '#') {
                    row[col] = '.';
                    row[write] = '#';
                    write--;
                }
            }
        }

        vector<vector<char>> rotated(n, vector<char>(m, '.'));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                rotated[j][m - 1 - i] = grid[i][j];
            }
        }
        return rotated;
    }
};
