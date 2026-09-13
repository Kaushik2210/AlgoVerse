#include <vector>
using namespace std;

class Solution {
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& nums) {
        vector<vector<int>> diagonals;
        int total = 0;

        for (int i = 0; i < (int)nums.size(); i++) {
            for (int j = 0; j < (int)nums[i].size(); j++) {
                int d = i + j;
                if ((int)diagonals.size() <= d) diagonals.resize(d + 1);
                diagonals[d].push_back(nums[i][j]);
                total++;
            }
        }

        vector<int> result;
        result.reserve(total);
        for (auto& bucket : diagonals) {
            for (int k = (int)bucket.size() - 1; k >= 0; k--) {
                result.push_back(bucket[k]);
            }
        }
        return result;
    }
};
