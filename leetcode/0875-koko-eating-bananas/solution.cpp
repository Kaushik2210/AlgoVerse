#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int lo = 1, hi = 0;
        for (int p : piles) hi = max(hi, p);

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (hoursNeeded(piles, mid) <= h) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

private:
    long long hoursNeeded(vector<int>& piles, int k) {
        long long hours = 0;
        for (int p : piles) {
            hours += (p + k - 1) / k;
        }
        return hours;
    }
};
