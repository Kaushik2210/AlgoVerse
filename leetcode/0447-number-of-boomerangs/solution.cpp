#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int numberOfBoomerangs(vector<vector<int>>& points) {
        int total = 0;

        for (auto& p0 : points) {
            unordered_map<int, int> distCount;
            for (auto& p1 : points) {
                int dx = p1[0] - p0[0];
                int dy = p1[1] - p0[1];
                int d = dx * dx + dy * dy;
                distCount[d]++;
            }

            for (auto& [d, count] : distCount) {
                total += count * (count - 1);
            }
        }

        return total;
    }
};
