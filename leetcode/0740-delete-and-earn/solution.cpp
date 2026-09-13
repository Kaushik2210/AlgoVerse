#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        if (nums.empty()) return 0;

        int maxVal = *max_element(nums.begin(), nums.end());
        vector<long long> points(maxVal + 1, 0);
        for (int x : nums) {
            points[x] += x;
        }

        long long take = 0, skip = 0;
        for (int v = 1; v <= maxVal; v++) {
            long long newTake = skip + points[v];
            long long newSkip = max(take, skip);
            take = newTake;
            skip = newSkip;
        }

        return (int)max(take, skip);
    }
};
