#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int smallestDivisor(vector<int>& nums, int threshold) {
        int lo = 1, hi = 0;
        for (int x : nums) hi = max(hi, x);

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (feasible(nums, threshold, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

private:
    bool feasible(vector<int>& nums, int threshold, int d) {
        long long sum = 0;
        for (int x : nums) {
            sum += (x + d - 1) / d;
        }
        return sum <= threshold;
    }
};
