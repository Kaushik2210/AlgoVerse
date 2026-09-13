#include <algorithm>
using namespace std;

class Solution {
public:
    int findKthNumber(int m, int n, int k) {
        int lo = 1, hi = m * n;

        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (countLessEqual(m, n, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

private:
    long long countLessEqual(int m, int n, int x) {
        long long total = 0;
        for (int i = 1; i <= m; i++) {
            total += min(x / i, n);
        }
        return total;
    }
};
