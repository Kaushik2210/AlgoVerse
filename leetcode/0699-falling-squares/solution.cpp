#include <vector>
#include <array>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> fallingSquares(vector<vector<int>>& positions) {
        vector<array<long long, 3>> placed; // {left, right, top}
        vector<int> result;
        long long maxHeightSoFar = 0;

        for (auto& pos : positions) {
            long long left = pos[0];
            long long size = pos[1];
            long long right = left + size;

            long long base = 0;
            for (auto& p : placed) {
                if (p[0] < right && left < p[1]) {
                    base = max(base, p[2]);
                }
            }
            long long top = base + size;
            placed.push_back({left, right, top});
            maxHeightSoFar = max(maxHeightSoFar, top);
            result.push_back((int)maxHeightSoFar);
        }

        return result;
    }
};
