#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int lo = 0, hi = 0;
        for (int w : weights) {
            lo = max(lo, w);
            hi += w;
        }

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (feasible(weights, days, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

private:
    bool feasible(vector<int>& weights, int days, int cap) {
        int usedDays = 1, cur = 0;
        for (int w : weights) {
            if (cur + w > cap) {
                usedDays++;
                cur = w;
                if (usedDays > days) return false;
            } else {
                cur += w;
            }
        }
        return true;
    }
};
