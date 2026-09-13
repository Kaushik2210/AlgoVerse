#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int splitArray(vector<int>& nums, int m) {
        long long lo = 0, hi = 0;
        for (int x : nums) {
            lo = max(lo, (long long)x);
            hi += x;
        }

        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (feasible(nums, m, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int)lo;
    }

private:
    bool feasible(vector<int>& nums, int m, long long cap) {
        int count = 1;
        long long cur = 0;
        for (int x : nums) {
            if (cur + x > cap) {
                count++;
                cur = x;
                if (count > m) return false;
            } else {
                cur += x;
            }
        }
        return true;
    }
};
