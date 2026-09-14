#include <vector>
using namespace std;

class Solution {
public:
    bool checkStraightLine(vector<vector<int>>& coordinates) {
        int x0 = coordinates[0][0], y0 = coordinates[0][1];
        int dx = coordinates[1][0] - x0, dy = coordinates[1][1] - y0;

        for (int i = 2; i < (int) coordinates.size(); i++) {
            int x = coordinates[i][0], y = coordinates[i][1];
            if ((long long) dx * (y - y0) - (long long) dy * (x - x0) != 0) {
                return false;
            }
        }

        return true;
    }
};
