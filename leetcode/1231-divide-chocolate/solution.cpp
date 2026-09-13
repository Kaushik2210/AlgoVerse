#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maximizeSweetness(vector<int>& sweetness, int k) {
        int lo = *min_element(sweetness.begin(), sweetness.end());
        long long total = 0;
        for (int s : sweetness) total += s;
        int hi = (int)(total / (k + 1));

        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (feasible(sweetness, k, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

private:
    bool feasible(vector<int>& sweetness, int k, int minSweet) {
        int pieces = 0;
        long long cur = 0;
        for (int s : sweetness) {
            cur += s;
            if (cur >= minSweet) {
                pieces++;
                cur = 0;
            }
        }
        return pieces >= k + 1;
    }
};
