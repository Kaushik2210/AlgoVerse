#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> spiralMatrixIII(int rows, int cols, int rStart, int cStart) {
        vector<vector<int>> result;
        result.push_back({rStart, cStart});
        int r = rStart, c = cStart;
        int dirs[4][2] = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int step = 1, d = 0;
        int total = rows * cols;

        while ((int)result.size() < total) {
            for (int turn = 0; turn < 2; turn++) {
                int dr = dirs[d][0], dc = dirs[d][1];
                for (int k = 0; k < step; k++) {
                    r += dr;
                    c += dc;
                    if (r >= 0 && r < rows && c >= 0 && c < cols) {
                        result.push_back({r, c});
                        if ((int)result.size() == total) return result;
                    }
                }
                d = (d + 1) % 4;
            }
            step++;
        }
        return result;
    }
};
