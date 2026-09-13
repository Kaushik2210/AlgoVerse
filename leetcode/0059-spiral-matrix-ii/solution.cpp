#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> matrix(n, vector<int>(n, 0));
        int top = 0, bottom = n - 1, left = 0, right = n - 1;
        int num = 1;

        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) {
                matrix[top][c] = num++;
            }
            top++;

            for (int r = top; r <= bottom; r++) {
                matrix[r][right] = num++;
            }
            right--;

            if (top <= bottom) {
                for (int c = right; c >= left; c--) {
                    matrix[bottom][c] = num++;
                }
                bottom--;
            }

            if (left <= right) {
                for (int r = bottom; r >= top; r--) {
                    matrix[r][left] = num++;
                }
                left++;
            }
        }

        return matrix;
    }
};
