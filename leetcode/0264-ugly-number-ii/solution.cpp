#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int nthUglyNumber(int n) {
        vector<long long> ugly(n);
        ugly[0] = 1;
        int p2 = 0, p3 = 0, p5 = 0;

        for (int i = 1; i < n; i++) {
            long long next2 = ugly[p2] * 2;
            long long next3 = ugly[p3] * 3;
            long long next5 = ugly[p5] * 5;
            long long nextUgly = min({next2, next3, next5});
            ugly[i] = nextUgly;

            if (nextUgly == next2) p2++;
            if (nextUgly == next3) p3++;
            if (nextUgly == next5) p5++;
        }

        return (int)ugly[n - 1];
    }
};
