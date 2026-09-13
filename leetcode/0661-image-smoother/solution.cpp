#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {
        int rows = (int)img.size(), cols = (int)img[0].size();
        vector<vector<int>> result(rows, vector<int>(cols, 0));

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                int total = 0, count = 0;
                for (int dr = -1; dr <= 1; dr++) {
                    for (int dc = -1; dc <= 1; dc++) {
                        int nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                            total += img[nr][nc];
                            count++;
                        }
                    }
                }
                result[r][c] = total / count;
            }
        }

        return result;
    }
};
